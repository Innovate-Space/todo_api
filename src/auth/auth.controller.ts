import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthDtO, AuthSignInDtO } from './dto';
import { AuthService } from './auth.service';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthResponse } from './types';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: AuthResponse, description: 'Sign in successful' })
  @ApiForbiddenResponse({ description: 'Omo something sup' })
  @Post('sign_in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: AuthSignInDtO): Promise<AuthResponse> {
    console.log(dto);
    return this.authService.login(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Sign up successful',
    type: AuthResponse,
  })
  @Post('sign_up')
  signUp(@Body() dto: AuthDtO): Promise<AuthResponse> {
    console.log(dto);
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('log_out')
  logout() {
    return 'logout';
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh() {
    return 'logout';
  }
}
