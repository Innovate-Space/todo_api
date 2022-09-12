import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDtO, AuthSignInDtO } from './dto';
import * as argon from 'argon2';
import { AuthResponse } from './types';

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(private readonly prisma: PrismaService) {}

  async login(dto: AuthSignInDtO): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (user && (await argon.verify(user.passwordHash, dto.password))) {
      return {
        message: 'Account successfully created',
        user: {
          email: user.email,
          firstName: user.firstName,
        },
        token: {
          access_token: 'I WILL BE THE ACCESS TOKEN',
          refresh_token: 'I WILL BE THE REFRESH TOKEN',
        },
      };
    }
    throw new ForbiddenException('User email/password is incorrect');
  }

  async signup(dto: AuthDtO) {
    console.log(dto);

    const user = await this.prisma.user.create({
      data: {
        // ...dto,
        email: dto.email,
        passwordHash: await argon.hash(dto.password),
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });
    return {
      message: 'Account successfully created',
      user: {
        email: user.email,
        firstName: user.firstName,
      },
      token: {
        access_token: 'I WILL BE THE ACCESS TOKEN',
        refresh_token: 'I WILL BE THE REFRESH TOKEN',
      },
    };
  }
}
