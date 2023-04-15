import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
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
}
