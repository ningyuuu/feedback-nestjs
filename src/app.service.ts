import { Injectable } from '@nestjs/common';
import { ProjectsService } from './projects/projects.service';
import { ScriptsService } from './scripts/scripts.service';
import { SnippetsService } from './snippets/snippets.service';

@Injectable()
export class AppService {
  constructor(
    private scriptsService: ScriptsService,
    private projectsService: ProjectsService,
    private snippetsService: SnippetsService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async findOutstanding(id: number) {
    const scripts = await this.scriptsService.findOutstanding(id);
    const scriptIds = scripts.map((script) => script.id);
    const projects = await this.projectsService.findByScripts(scriptIds);

    return projects;
  }

  async findProjects(id: number) {
    const projects = await this.projectsService.findByUserWithAssignments(id);
    return projects;
  }

  async findVault(id: number) {
    const snippets = await this.snippetsService.findByUserId(id);
    const snippetIds = snippets.map((snippet) => snippet.id);
    const projectsWithSnippets = await this.projectsService.findBySnippets(snippetIds);
    return projectsWithSnippets;
  }

  async findAssignmentVault(userId: number, assignmentId: number) {
    const snippets = await this.snippetsService.findByUserAndAssignment(userId, assignmentId);
    return snippets;
  }
}
