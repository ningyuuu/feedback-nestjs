import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class AdminService {
  constructor(private projectsService: ProjectsService) {}

  create(createProjectDto: CreateProjectDto, ownerId: number) {
    return this.projectsService.create({
      ...createProjectDto,
      owner: ownerId,
    });
  }

  findAllProjects(ownerId: number) {
    return this.projectsService.findByOwner(ownerId);
  }
}
