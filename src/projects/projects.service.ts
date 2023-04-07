import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { PopulateHint } from '@mikro-orm/core';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private readonly projectRepo: EntityRepository<Project>) {}
  async create(createProjectDto: CreateProjectDto) {
    const project = this.projectRepo.create(createProjectDto);
    await this.projectRepo.flush();
    return project;
  }

  findAll() {
    return this.projectRepo.findAll();
  }

  findOne(id: number) {
    return this.projectRepo.findOne({ id });
  }

  findByScripts(scriptIds: number[]) {
    console.log({ scriptIds });
    return this.projectRepo.find(
      { assignments: { scripts: { id: { $in: scriptIds } } } },
      { populate: ['assignments.scripts'], populateWhere: PopulateHint.INFER },
    );
  }
}
