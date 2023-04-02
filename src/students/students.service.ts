import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ProjectsService } from 'src/projects/projects.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private readonly studentRepo: EntityRepository<Student>,
    private readonly projectsService: ProjectsService,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const project = this.projectsService.findOne(createStudentDto.project);

    if (!project) {
      throw new Error('Project not found');
    }

    const student = this.studentRepo.create(createStudentDto);
    await this.studentRepo.persistAndFlush(student);
    return student;
  }

  findAll() {
    this.studentRepo.findAll();
  }

  findOne(id: number) {
    this.studentRepo.findOne({ id });
  }
}
