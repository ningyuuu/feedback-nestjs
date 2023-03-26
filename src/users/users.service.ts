import { EntityData } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersRepository } from './entities/users.repository';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: UsersRepository) {}
  async create(createEntryDto: EntityData<User>) {
    const user = this.userRepository.create(createEntryDto);
    await this.userRepository.flush();
    return this.extractPassword(user);
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return users.map(this.extractPassword);
  }

  findOne(login: string) {
    return this.userRepository.findOne({ login });
  }

  extractPassword(user: User) {
    const { password, ...result } = user;
    return result;
  }
}
