import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { EntityData, PopulateHint } from '@mikro-orm/core';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private readonly projectRepo: EntityRepository<Project>,
    private usersService: UsersService,
  ) {}
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
    return this.projectRepo.find({ owner });
  }

  findByIdAndOwner(id: number, owner: number) {
    return this.projectRepo.findOne({ id, owner }, { populate: ['assignments', 'instructors'] });
  }

  async removeInstructors(id: number, instructorIds: number[], owner: number) {
    const project = await this.projectRepo.findOne({ id, owner }, { populate: ['instructors'] });

    if (!project) {
      return project;
    }

    for (const instructor of project.instructors) {
      if (instructorIds.includes(instructor.id)) {
        project.instructors.remove(instructor);
      }
    }

    await this.projectRepo.flush();

    return project;
  }

  async addInstructor(id: number, instructorId: number, owner: number) {
    console.log({ id, instructorId, owner });
    const project = await this.projectRepo.findOne({ id, owner }, { populate: ['instructors'] });

    if (!project) {
      return project;
    }

    const user = await this.usersService.findById(instructorId);
    project.instructors.add(user);

    await this.projectRepo.flush();
    return project;
  }
}
