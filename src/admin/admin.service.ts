import { Injectable } from '@nestjs/common';
import { AssignmentsService } from 'src/assignments/assignments.service';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';
import { ProjectsService } from 'src/projects/projects.service';
import { CreateGradingDto } from 'src/gradings/dto/create-grading.dto';
import { GradingsService } from 'src/gradings/gradings.service';
import { StudentsService } from 'src/students/students.service';

@Injectable()
export class AdminService {
  constructor(
    private projectsService: ProjectsService,
    private assignmentsService: AssignmentsService,
    private gradingsService: GradingsService,
    private studentsService: StudentsService,
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
    if (!ids) {
      return [];
    }

    return await this.assignmentsService.bulkDelete(ids, ownerId);
  }

  async getGradingsByAssignmentId(assignmentId: number, ownerId: number) {
    if (!assignmentId) {
      return null;
    }

    const assignment = await this.assignmentsService.findByIdAndOwner(assignmentId, ownerId);
    return assignment;
  }

  async createGradingForAsgmt(assignmentId: number, dto: CreateGradingDto, ownerId: number) {
    if (!assignmentId) {
      return null;
    }

    const assignment = await this.assignmentsService.findByIdAndOwner(assignmentId, ownerId);
    if (!assignment) {
      return null;
    }

    const grading = await this.gradingsService.create(assignmentId, dto);
    return grading;
  }

  async editGrading(id: number, dto: CreateGradingDto, ownerId: number) {
    if (!id) {
      return null;
    }

    const updatedGrading = await this.gradingsService.update(id, dto, ownerId);
    return updatedGrading;
  }

  async deleteGradings(ids: number[], ownerId: number) {
    if (!ids) {
      return [];
    }

    return await this.gradingsService.bulkDelete(ids, ownerId);
  }

  async getInstructorsByProjectId(projectId: number, ownerId: number) {
    if (!projectId) {
      return null;
    }

    const project = await this.projectsService.findByIdAndOwner(projectId, ownerId);
    return project;
  }

  async deleteInstructors(ids: number[], projectId: number, ownerId: number) {
    if (!ids || !projectId) {
      return [];
    }

    const project = await this.projectsService.removeInstructors(projectId, ids, ownerId);
    return project;
  }

  async addInstructor(instructorId: number, projectId: number, ownerId: number) {
    if (!projectId || !instructorId) {
      return null;
    }

    const project = await this.projectsService.addInstructor(projectId, instructorId, ownerId);
    return project;
  }

  async getStudentsByProjectId(projectId: number, ownerId: number) {
    if (!projectId) {
      return null;
    }

    const project = await this.projectsService.findByIdAndOwner(projectId, ownerId);
    return project;
  }

  async deleteStudents(ids: number[], projectId: number, ownerId: number) {
    if (!ids || !projectId) {
      return [];
    }

    const project = await this.projectsService.removeStudents(projectId, ids, ownerId);
    return project;
  }

  async addStudent(dto: { name: string; email: string }, projectId: number, ownerId: number) {
    if (!projectId) {
      return null;
    }

    const project = await this.projectsService.findByIdAndOwner(projectId, ownerId);
    if (!project) {
      return null;
    }

    const student = await this.studentsService.create({
      project: projectId,
      ...dto,
    });
    return student;
  }

  async getAssignmentData(id: number, ownerId: number) {
    if (!id) {
      return null;
    }

    const assignment = await this.assignmentsService.findScriptsByIdAndOwner(id, ownerId);
    return assignment;
  }

  async deleteScripts(ids: number[], assignmentId: number, ownerId: number) {
    if (!ids) {
      return null;
    }

    return await this.assignmentsService.bulkDeleteScripts(assignmentId, ids, ownerId);
  }

  async resetScripts(ids: number[], assignmentId: number, ownerId: number) {
    if (!ids) {
      return null;
    }

    return await this.assignmentsService.bulkResetScripts(assignmentId, ids, ownerId);
  }

  async assignScripts(
    dto: { ids: number[]; instructor: number },
    assignmentId: number,
    ownerId: number,
  ) {
    if (!dto.instructor || !assignmentId) {
      console.log('dto ??', dto, assignmentId);
      return null;
    }

    return await this.assignmentsService.bulkAssignScripts(
      assignmentId,
      dto.ids,
      dto.instructor,
      ownerId,
    );
  }
}