import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { AssignmentsService } from 'src/assignments/assignments.service';
import { UsersService } from 'src/users/users.service';
import { AssignScriptDto } from './dto/assign-script.dto';
import { CreateScriptDto } from './dto/create-script.dto';
import { Script } from './entities/script.entity';

@Injectable()
export class ScriptsService {
  constructor(
    @InjectRepository(Script) private readonly scriptRepo: EntityRepository<Script>,
    private readonly assignmentsService: AssignmentsService,
    private readonly usersService: UsersService,
  ) {}
  async create(createScriptDto: CreateScriptDto) {
    const assignment = await this.assignmentsService.findOne(createScriptDto.assignment);
    if (!assignment) {
      throw new Error('Assignment not found');
    }

    const script = this.scriptRepo.create(createScriptDto);
    await this.scriptRepo.flush();
    return script;
  }

  findAll() {
    return this.scriptRepo.findAll();
  }

  findOne(id: number) {
    return this.scriptRepo.findOne({ id });
  }

  async assign(id: number, assignScriptDto: AssignScriptDto) {
    const script = await this.scriptRepo.findOne({ id });
    if (!script) {
      throw new Error('Script not found');
    }

    const user = await this.usersService.findById(assignScriptDto.assignee);
    if (!user) {
      throw new Error('User not found');
    }

    script.assignee = user;
    await this.scriptRepo.flush();

    return script;
  }

  remove(id: number) {
    return this.scriptRepo.removeAndFlush({ id });
  }
}
