import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private user: User) {}

  @Post('sign_in')
  signIn(@Body() user: User) {
    return this.authService.login(user);
  }

  @Post('sign_up')
  signUp(@Body() user: User) {
    return this.authService.signup(user);
  }
}
