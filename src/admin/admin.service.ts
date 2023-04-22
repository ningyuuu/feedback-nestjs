import { Injectable } from '@nestjs/common';
import { AssignmentsService } from 'src/assignments/assignments.service';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class AdminService {
  constructor(
    private projectsService: ProjectsService,
    private assignmentsService: AssignmentsService,
  ) {}

  create(createProjectDto: CreateProjectDto, ownerId: number) {
    return this.projectsService.create({
      ...createProjectDto,
      owner: ownerId,
    });
  }

  findAllProjects(ownerId: number) {
    return this.projectsService.findByOwner(ownerId);
  }

  async getAssignmentsByProjectId(projectId: number, ownerId: number) {
    if (!projectId) {
      return null;
    }

    const project = await this.projectsService.findByIdAndOwner(projectId, ownerId);
    return project;
  }

  async createAssignmentForProject(projectId: number, name: string, ownerId: number) {
    if (!projectId) {
      return null;
    }

    const project = await this.projectsService.findByIdAndOwner(projectId, ownerId);
    if (!project) {
      return null;
    }

    const assignment = this.assignmentsService.create({
      project: projectId,
      name,
      description: '',
    });
    return assignment;
  }

  async deleteAssignments(ids: number[], ownerId: number) {
    console.log('deleteAssignments', ids);
    if (!ids) {
      return [];
    }

    return await this.assignmentsService.bulkDelete(ids, ownerId);
  }
}
