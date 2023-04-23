import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Query,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';
import { CreateGradingDto } from 'src/gradings/dto/create-grading.dto';

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
  async createAssignment(
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

  @UseGuards(AuthGuard('jwt'))
  @Get('gradings')
  getGradings(@Query('assignment') assignmentId: number, @Req() req: any) {
    return this.adminService.getGradingsByAssignmentId(assignmentId, +req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('gradings')
  async createGrading(
    @Query('assignment') aid: number,
    @Req() req: any,
    @Body() dto: CreateGradingDto,
  ) {
    const assignment = await this.adminService.createGradingForAsgmt(aid, dto, +req.user.userId);

    if (!assignment) {
      throw new BadRequestException('target project not found');
    }

    return assignment;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('gradings/:id')
  async editGrading(@Param('id') gid: number, @Req() req: any, @Body() dto: CreateGradingDto) {
    const assignment = await this.adminService.editGrading(gid, dto, +req.user.userId);

    if (!assignment) {
      throw new BadRequestException('target project not found');
    }

    return assignment;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('gradings/delete')
  deleteGradings(@Req() req: any, @Body() dto: { ids: number[] }) {
    return this.adminService.deleteGradings(dto.ids, +req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('instructors')
  getInstructors(@Query('project') projectId: number, @Req() req: any) {
    return this.adminService.getInstructorsByProjectId(+projectId, +req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('instructors')
  addInstructor(@Query('project') projectId: number, @Body() dto: { id: number }, @Req() req: any) {
    return this.adminService.addInstructor(dto.id, +projectId, +req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('instructors/delete')
  deleteInstructors(
    @Req() req: any,
    @Body() dto: { ids: number[] },
    @Query('project') projectId: number,
  ) {
    return this.adminService.deleteInstructors(dto.ids, +projectId, +req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('students')
  getStudents(@Query('project') projectId: number, @Req() req: any) {
    return this.adminService.getStudentsByProjectId(+projectId, +req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('students')
  addStudent(
    @Query('project') projectId: number,
    @Body() dto: { name: string; email: string },
    @Req() req: any,
  ) {
    return this.adminService.addStudent(dto, +projectId, +req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('students/delete')
  deleteStudents(
    @Req() req: any,
    @Body() dto: { ids: number[] },
    @Query('project') projectId: number,
  ) {
    return this.adminService.deleteStudents(dto.ids, +projectId, +req.user.userId);
  }
}
