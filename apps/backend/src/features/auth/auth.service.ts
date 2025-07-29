import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UserService } from '../user/user.service';
import {
  RegisterUser,
  RegisterOrLoginUserResponse,
  LoginUser,
  OAuthUser,
} from '@moodflow/types';
import { AccountStatus, User } from '@prisma/client';
import { sendResetPasswordMail } from '../../mail/mailer';
import { DashboardService } from '../dashboard/dashboard.service';
import { DashboardData } from '@moodflow/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private dashboardService: DashboardService,
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

  generateJWT(user: User): string {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return this.jwtService.sign(payload);
  }

  async login(loginUser: LoginUser): Promise<RegisterOrLoginUserResponse> {
    const user: User | null = await this.validateUser(loginUser);
    if (!user) {
      throw new UnauthorizedException(
        'Les identifiants saisis sont incorrects.',
      );
    }
    const dashboard: DashboardData =
      await this.dashboardService.getDashboardData(user.id);

    return {
      user: {
        accessToken: this.generateJWT(user),
        name: user.name,
      },
      dashboard,
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
      accountStatus: AccountStatus.ACTIVE,
    });

    const dashboard: DashboardData =
      await this.dashboardService.getDashboardData(user.id);

    return {
      user: {
        name: user.name,
        accessToken: this.generateJWT(user),
      },
      dashboard,
    };
  }

  async refreshToken(user: User): Promise<RegisterOrLoginUserResponse> {
    const dashboard: DashboardData =
      await this.dashboardService.getDashboardData(user.id);

    return {
      user: {
        name: user.name,
        accessToken: this.generateJWT(user),
      },
      dashboard,
    };
  }

  async loginOAuth2(userData: OAuthUser): Promise<string> {
    let user: User | null = await this.userService.findByEmail(userData.email);

    if (!user) {
      const fakePassword: string =
        Math.random().toString(36) + Date.now().toString();
      const hashedPassword: string = await hash(fakePassword, 10);

      user = await this.userService.create({
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        accountStatus: AccountStatus.ACTIVE,
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
