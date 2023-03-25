import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as IRequest } from 'express';
import { LocalAuthDto } from './dto/local-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() _auth: LocalAuthDto, @Request() req: IRequest) {
    return this.authService.login(req.user);
  }
}
