import { Injectable } from '@nestjs/common';
import { ProjectsService } from './projects/projects.service';
import { ScriptsService } from './scripts/scripts.service';

@Injectable()
export class AppService {
  constructor(private scriptsService: ScriptsService, private projectsService: ProjectsService) {}
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
}
