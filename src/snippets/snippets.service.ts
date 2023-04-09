import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { AssignmentsService } from 'src/assignments/assignments.service';
import { ProjectsService } from 'src/projects/projects.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { Snippet } from './entities/snippet.entity';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectRepository(Snippet) private readonly snippetRepository: EntityRepository<Snippet>,
    private readonly projectsService: ProjectsService,
    private readonly assignmentsService: AssignmentsService,
  ) {}
  async create(createSnippetDto: CreateSnippetDto) {
    const project = await this.projectsService.findOne(createSnippetDto.project);
    if (!project) {
      throw new Error('Project not found');
    }

    if (createSnippetDto.assignment) {
      const assignment = await this.assignmentsService.findOne(createSnippetDto.assignment);
      if (!assignment) {
        throw new Error('Assignment not found');
      }
    }

    const snippet = this.snippetRepository.create(createSnippetDto);
    await this.snippetRepository.flush();
    return snippet;
  }

  findAll() {
    return this.snippetRepository.findAll();
  }

  findOne(id: number) {
    return this.snippetRepository.findOne({ id });
  }

  findByUserId(id: number) {
    return this.snippetRepository.find({
      $or: [{ user: id }, { user: { $exists: false } }],
    });
  }

  async update(id: number, updateSnippetDto: UpdateSnippetDto) {
    const snippet = await this.snippetRepository.findOne({ id });
    if (!snippet) {
      throw new Error('Snippet not found');
    }

    if (updateSnippetDto.assignment) {
      const assignment = await this.assignmentsService.findOne(updateSnippetDto.assignment);
      if (!assignment) {
        throw new Error('Assignment not found');
      }
      snippet.assignment = assignment;
    }

    if (updateSnippetDto.text) {
      snippet.text = updateSnippetDto.text;
    }

    await this.snippetRepository.persistAndFlush(snippet);

    return snippet;
  }

  async findByUserAndAssignment(userId: number, assignmentId: number) {
    const assignment = await this.assignmentsService.findOne(assignmentId);
    if (!assignment) {
      throw new Error('Assignment not found');
    }

    console.log({ assignment }, assignment.id, assignment.project.id);

    const assignmentSnippets = await this.snippetRepository.find({
      assignment: assignment.id,
      $or: [{ user: userId }, { user: { $exists: false } }],
    });
    const projectSnippets = await this.snippetRepository.find({
      project: assignment.project.id,
      $or: [{ user: userId }, { user: { $exists: false } }],
    });
    const snippets = [...assignmentSnippets, ...projectSnippets];

    return snippets;
  }
}
