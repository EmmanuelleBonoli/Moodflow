import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { config } from '../../config/config';
import { PayloadUser } from '@moodflow/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.secret,
    });
  }

  async validate(payload: PayloadUser) {
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('utilisateur manquant');
    }
    return user;
  }
}
