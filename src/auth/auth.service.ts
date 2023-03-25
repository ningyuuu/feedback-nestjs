import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(login: string, pass: string) {
    const user = await this.usersService.findOne(login);

    if (user && user.password === pass) {
      const { password: _, ...result } = user;
      return result;
    }

    return null;
  }

  login(user: any) {
    const payload = { username: user.login, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
