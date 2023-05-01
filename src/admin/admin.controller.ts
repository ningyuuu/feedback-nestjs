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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';
import { CreateGradingDto } from 'src/gradings/dto/create-grading.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @Post('assignments/:id')
  updateAssignments(
    @Req() req: any,
    @Param('id') id: number,
    @Body() dto: { name: string; description: string },
  ) {
    console.log({ dto });
    return this.adminService.updateAssignments(id, dto, +req.user.userId);
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
  @Post('gradings/delete')
  deleteGradings(@Req() req: any, @Body() dto: { ids: number[] }) {
    return this.adminService.deleteGradings(dto.ids, +req.user.userId);
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

  @UseGuards(AuthGuard('jwt'))
  @Get('data/assignment/:id')
  getAssignmentData(@Param('id') id: number, @Req() req: any) {
    return this.adminService.getAssignmentData(id, +req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('scripts/delete')
  deleteScripts(
    @Req() req: any,
    @Body() dto: { ids: number[] },
    @Query('assignment') assignmentId: number,
  ) {
    return this.adminService.deleteScripts(dto.ids, +assignmentId, +req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('scripts/reset')
  resetScripts(
    @Req() req: any,
    @Body() dto: { ids: number[] },
    @Query('assignment') assignmentId: number,
  ) {
    return this.adminService.resetScripts(dto.ids, +assignmentId, +req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('scripts/assign')
  assignScripts(
    @Req() req: any,
    @Body() dto: { ids: number[]; instructor: number },
    @Query('assignment') assignmentId: number,
  ) {
    return this.adminService.assignScripts(dto, +assignmentId, +req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @Post('scripts/upload')
  uploadScript(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
    @Body() dto: { fileName: string; student: string },
    @Query('assignment') assignmentId: number,
  ) {
    return this.adminService.uploadScript(+assignmentId, dto, file, +req.user.userId);
  }
}
