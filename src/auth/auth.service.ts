import { EntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(login: string, pass: string) {
    const user = await this.usersService.findOne(login);

    if (user && user.password === pass) {
      return this.usersService.extractPassword(user);
    }

    return null;
  }

  login(user: any) {
    const payload = { login: user.login, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(auth: EntityData<User>) {
    if (this.usersService.findOne(auth.login)) {
      throw new Error('User already exists');
    }

    return this.usersService.create(auth);
  }
}
