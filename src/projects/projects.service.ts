import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { EntityData, PopulateHint } from '@mikro-orm/core';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private readonly projectRepo: EntityRepository<Project>) {}
  async create(createProjectDto: EntityData<Project>) {
    const project = this.projectRepo.create(createProjectDto);
    await this.projectRepo.flush();
    return project;
  }

  findAll() {
    return this.projectRepo.findAll();
  }

  findOne(id: number) {
    return this.projectRepo.findOne(
      { id },
      { populate: ['assignments.scripts.student', 'assignments.scripts.scriptGrades'] },
    );
  }

  findByScripts(scriptIds: number[]) {
    return this.projectRepo.find(
      { assignments: { scripts: { id: { $in: scriptIds } } } },
      { populate: ['assignments.scripts.student'], populateWhere: PopulateHint.INFER },
    );
  }

  findBySnippets(snippetIds: number[]) {
    return this.projectRepo.find(
      {
        $or: [
          { assignments: { snippets: { id: { $in: snippetIds } } } },
          { snippets: { id: { $in: snippetIds } } },
        ],
      },
      { populate: ['assignments.snippets', 'snippets'], populateWhere: PopulateHint.INFER },
    );
  }

  findByUserWithAssignments(_userId: number) {
    return this.projectRepo.find({}, { populate: ['assignments'] });
  }

  findByOwner(owner: number) {
    return this.projectRepo.find({ owner: owner });
  }
}
