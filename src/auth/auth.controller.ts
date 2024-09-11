import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  public async signIn(@Body() signInData: { email: string; password: string }, @Res({ passthrough: true }) response: Response): Promise<{ accessToken: string }> {
    const { accessToken } = await this.authService.signIn(signInData.email, signInData.password);
    this.setCookie(response, accessToken);
    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  public async signUp(@Body() signUpData: { firstName: string; lastName: string; email: string; password: string }, @Res({ passthrough: true }) response: Response): Promise<{ accessToken: string }> {
    const { accessToken } = await this.authService.signUp(signUpData.firstName, signUpData.lastName, signUpData.email, signUpData.password);
    this.setCookie(response, accessToken);

    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Post('signout')
  public async signOut(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<{ accessToken: string }> {
    await this.authService.signOut(request.cookies['jwt']);
    response.clearCookie('jwt', { httpOnly: true });

    return { accessToken: null };
  }

  @HttpCode(HttpStatus.OK)
  @Get('token')
  public async getToken(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<{ accessToken: string }> {
    const { accessToken } = await this.authService.getToken(request.cookies['jwt']);
    this.setCookie(response, accessToken);

    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  public async refreshToken(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<{ accessToken: string }> {
    const { accessToken } = await this.authService.refreshToken(request.cookies['jwt']);
    this.setCookie(response, accessToken);

    return { accessToken };
  }

  private setCookie(response: Response, token: string) {
    response.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
  }
}
