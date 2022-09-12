import { ApiProperty } from '@nestjs/swagger';
import { Token } from './token.type';
import { UserType } from './user.type';

export class AuthResponse {
  @ApiProperty({ example: 'Sign in/ sign up was successful' })
  message: string;
  @ApiProperty({ type: Token })
  token: Token;
  @ApiProperty({ type: UserType })
  user: UserType;
}
