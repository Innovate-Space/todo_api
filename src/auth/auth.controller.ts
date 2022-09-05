import { Body, Controller, Post } from '@nestjs/common';
import { AuthDtO, AuthSignInDtO } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign_in')
  signIn(@Body() dto: AuthSignInDtO) {
    console.log(dto);
    return this.authService.login(dto);
  }

  @Post('sign_up')
  signUp(@Body() dto: AuthDtO) {
    console.log(dto);
    return this.authService.signup(dto);
  }
}
