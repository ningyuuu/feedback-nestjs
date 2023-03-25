import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createEntryDto: CreateUserDto) {
    return this.usersService.create(createEntryDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/test')
  test() {
    return 'Hello authenticated!';
  }
}
