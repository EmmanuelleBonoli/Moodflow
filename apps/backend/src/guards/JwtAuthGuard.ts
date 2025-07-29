import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<User>(err: Error, user: User): User {
    if (err || !user) {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
    return user;
  }
}
