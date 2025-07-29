import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Req,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import {
  RegisterUser,
  RegisterOrLoginUserResponse,
  LoginUser,
  OAuthUser,
} from '@moodflow/types';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from '../../decorators/get-user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../../guards/JwtAuthGuard';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginUser: LoginUser,
  ): Promise<RegisterOrLoginUserResponse> {
    return this.authService.login(loginUser);
  }

  @Post('/register')
  async register(
    @Body() registerUser: RegisterUser,
  ): Promise<RegisterOrLoginUserResponse> {
    return this.authService.register(registerUser);
  }

  @Get('/refreshToken')
  @UseGuards(JwtAuthGuard)
  async refreshToken(
    @getUser() user: User,
  ): Promise<RegisterOrLoginUserResponse> {
    return this.authService.refreshToken(user);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: Request & { user: OAuthUser },
    @Res() res: Response,
  ): Promise<void> {
    const { user } = req;
    if (!user) {
      throw new NotFoundException('utilisateur introuvable.');
    }
    const jwt: string = await this.authService.loginOAuth2(user);
    return res.redirect(
      `${process.env.FRONTEND_URL}/oauth2-success?token=${jwt}`,
    );
  }

  // @Post('/forgot-password')
  // async forgotPassword(@Body('email') email: string) {
  //   return this.authService.forgotPassword(email);
  // }
  //
  // @Post('/reset-password')
  // async resetPassword(
  //   @Body('token') token: string,
  //   @Body('newPassword') newPassword: string,
  // ) {
  //   return this.authService.resetPassword(token, newPassword);
  // }
}
