import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthSignInDtO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  password: string;
}
