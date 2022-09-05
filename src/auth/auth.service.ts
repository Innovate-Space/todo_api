import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDtO, AuthSignInDtO } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(private readonly prisma: PrismaService) {}

  async login(dto: AuthSignInDtO) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (user && (await argon.verify(user.passwordHash, dto.password))) {
      return user;
    }
    throw new ForbiddenException('User email/password is incorrect');
  }

  async signup(dto: AuthDtO) {
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash: await argon.hash(dto.password),
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });
    return user;
  }
}
