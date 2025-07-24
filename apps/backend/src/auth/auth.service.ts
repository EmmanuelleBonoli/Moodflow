import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UserService } from '../user/user.service';
import {
  RegisterUser,
  RegisterOrLoginUserResponse,
  LoginUser,
} from '@moodflow/types/auth';
import { User } from '@prisma/client';
import { sendResetPasswordMail } from '../mail/mailer';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginUser: LoginUser): Promise<any> {
    const user: User | null = await this.userService.findByEmail(
      loginUser.email,
    );
    if (user && (await compare(loginUser.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUser: LoginUser): Promise<RegisterOrLoginUserResponse> {
    const user = await this.validateUser(loginUser);
    if (!user) {
      throw new UnauthorizedException(
        'Les identifiants saisis sont incorrects.',
      );
    }

    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(
    registerUser: RegisterUser,
  ): Promise<RegisterOrLoginUserResponse> {
    const hashedPassword: string = await hash(registerUser.password, 10);
    const user: User = await this.userService.create({
      email: registerUser.email,
      password: hashedPassword,
      name: registerUser.name,
    });

    //  const { password: _, ...userWithoutPassword } = user;
    const payload = { email: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async loginOAuth2(userData: User): Promise<string> {
    let user: User | null = await this.userService.findByEmail(userData.email);

    if (!user) {
      const fakePassword: string =
        Math.random().toString(36) + Date.now().toString();
      const hashedPassword: string = await hash(fakePassword, 10);

      user = await this.userService.create({
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
      });
    }

    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async forgotPassword(email: string): Promise<void> {
    const user: User | null = await this.userService.findByEmail(email);
    if (!user) {
      return;
    }

    const payload = { sub: user.id };
    const resetToken = this.jwtService.sign(payload, { expiresIn: '30m' });

    await sendResetPasswordMail(user.email, resetToken);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    let payload: any;
    try {
      payload = this.jwtService.verify(token);
    } catch (e) {
      throw new BadRequestException('Token invalide ou expiré.');
    }
    const user: User | null = await this.userService.findById(payload.sub);
    if (!user) throw new NotFoundException('Utilisateur introuvable.');

    const hashedPassword: string = await hash(newPassword, 10);
    await this.userService.update(user.id, { password: hashedPassword });
  }
}
