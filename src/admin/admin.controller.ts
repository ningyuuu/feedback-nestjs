import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('projects')
  create(@Body() createProjectDto: CreateProjectDto, @Req() req: any) {
    return this.adminService.create(createProjectDto, +req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('projects')
  findAllProjects(@Req() req: any) {
    return this.adminService.findAllProjects(+req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('assignments')
  getAssignments(@Query('project') projectId: number, @Req() req: any) {
    return this.adminService.getAssignmentsByProjectId(projectId, +req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('assignments')
  async createAssignments(
    @Query('project') projectId: number,
    @Req() req: any,
    @Body() createAssignmentDto: { name: string },
  ) {
    const assignment = await this.adminService.createAssignmentForProject(
      projectId,
      createAssignmentDto.name,
      +req.user.userId,
    );

    if (!assignment) {
      throw new BadRequestException('target project not found');
    }

    return assignment;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('assignments/delete')
  deleteAssignments(@Req() req: any, @Body() dto: { ids: number[] }) {
    return this.adminService.deleteAssignments(dto.ids, +req.user.userId);
  }
}
