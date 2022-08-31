import { Injectable } from '@nestjs/common';
import { User } from 'src/dto';

@Injectable()
export class AuthService {
  private users: User[] = [];

  login(user: User) {
    const foundUser = this.users.find(
      (usr) => usr.email == user.email && usr.password == user.password,
    );
    console.log(foundUser);
    if (foundUser) {
      return {
        message: 'Login successful',
        user,
      };
    }
    return { message: 'User does not exist' };
  }

  signup(user: User) {
    const userIndex = this.users.findIndex((usr) => usr.email == user.email);

    if (userIndex == -1) {
      this.users.push(user);
      return user;
    }
    return { message: 'User already exists' };
  }
}
