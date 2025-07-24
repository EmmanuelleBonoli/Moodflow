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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RegisterUser,
  RegisterOrLoginUserResponse,
  LoginUser,
} from '@moodflow/types/auth';
import { AuthGuard } from '@nestjs/passport';

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
    console.log('Registering user:', registerUser);
    return this.authService.register(registerUser);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const { user } = req;
    const jwt: string = await this.authService.loginOAuth2(user);
    return res.redirect(
      `${process.env.FRONTEND_URL}/oauth2-success?token=${jwt}`,
    );
  }

  @Post('/forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('/reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(token, newPassword);
  }
}
