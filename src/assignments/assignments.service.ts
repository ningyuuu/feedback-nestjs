import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProjectsService } from 'src/projects/projects.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { Assignment } from './entities/assignment.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment) private readonly assignmentRepo: EntityRepository<Assignment>,
    private readonly projectService: ProjectsService,
    private readonly usersService: UsersService,
  ) {}
  async create(createAssignmentDto: CreateAssignmentDto) {
    const projectId = createAssignmentDto.project;
    const project = await this.projectService.findOne(projectId);

    if (!project) {
      throw new BadRequestException('Project not found');
    }

    const assignment = this.assignmentRepo.create(createAssignmentDto);
    await this.assignmentRepo.persistAndFlush(assignment);
    return assignment;
  }

  findAll() {
    return this.assignmentRepo.findAll();
  }

  findOne(id: number) {
    return this.assignmentRepo.findOne(
      { id },
      { populate: ['scripts.scriptGrades', 'scripts.student'] },
    );
  }

  async updateAssignment(id: number, dto: { name: string; description: string }, owner: number) {
    const assignment = await this.assignmentRepo.findOne({ id, project: { owner } });
    if (!assignment) return null;

    if (dto.name) {
      assignment.name = dto.name;
    }

    if (dto.description) {
      assignment.description = dto.description;
    }

    await this.assignmentRepo.flush();
    return assignment;
  }

  async findByProjectId(project: number) {
    const assignments = await this.assignmentRepo.find({ project });
    return assignments;
  }

  bulkDelete(ids: number[], ownerId: number) {
    return this.assignmentRepo.nativeDelete({ id: { $in: ids }, project: { owner: ownerId } });
  }

  findByIdAndOwner(id: number, ownerId: number) {
    return this.assignmentRepo.findOne(
      { id, project: { owner: ownerId } },
      { populate: ['gradings', 'project'] },
    );
  }

  findScriptsByIdAndOwner(id: number, ownerId: number) {
    return this.assignmentRepo.findOne(
      { id, project: { owner: ownerId } },
      {
        populate: [
          'scripts.student',
          'scripts.assignee',
          'scripts.assignment',
          'scripts.scriptGrades.grading',
          'project.instructors',
          'project.students',
        ],
      },
    );
  }

  async bulkDeleteScripts(id: number, scriptIds: number[], ownerId: number) {
    if (!id || !ownerId) {
      return null;
    }

    const assignment = await this.assignmentRepo.findOne(
      { id, project: { owner: ownerId } },
      { populate: ['scripts'] },
    );

    if (!assignment) {
      return null;
    }

    for (const script of assignment.scripts) {
      if (scriptIds.includes(script.id)) {
        assignment.scripts.remove(script);
      }
    }

    await this.assignmentRepo.flush();

    return assignment;
  }

  async bulkResetScripts(id: number, scriptIds: number[], ownerId: number) {
    if (!id || !ownerId) {
      return null;
    }

    const assignment = await this.assignmentRepo.findOne(
      { id, project: { owner: ownerId } },
      { populate: ['scripts.scriptGrades'] },
    );

    if (!assignment) {
      return null;
    }

    for (const script of assignment.scripts) {
      if (scriptIds.includes(script.id)) {
        script.scriptGrades.removeAll();
      }
    }

    await this.assignmentRepo.flush();

    return assignment;
  }

  async bulkAssignScripts(id: number, scriptIds: number[], instructorId: number, ownerId: number) {
    if (!id || !ownerId) {
      return null;
    }

    const assignment = await this.assignmentRepo.findOne(
      { id, project: { owner: ownerId } },
      { populate: ['scripts.assignee'] },
    );

    const instructor = await this.usersService.findById(instructorId);

    if (!assignment || !instructor) {
      return null;
    }

    for (const script of assignment.scripts) {
      if (scriptIds.includes(script.id)) {
        script.assignee = instructor;
      }
    }

    await this.assignmentRepo.flush();

    return assignment;
  }
}
