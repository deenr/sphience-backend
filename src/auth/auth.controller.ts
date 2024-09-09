import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  public signIn(@Body() signInData: { email: string; password: string }): Promise<{ token: string }> {
    return this.authService.signIn(signInData.email, signInData.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  public signUp(@Body() signUpData: { firstName: string; lastName: string; email: string; password: string }): Promise<{ token: string }> {
    return this.authService.signUp(signUpData.firstName, signUpData.lastName, signUpData.email, signUpData.password);
  }
}
