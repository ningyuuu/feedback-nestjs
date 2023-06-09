import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('outstanding')
  getOutstanding(@Req() req: any) {
    return this.appService.findOutstanding(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('myprojects')
  getMyProjects(@Req() req: any) {
    return this.appService.findProjects(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('myvault')
  getMyVault(@Req() req: any) {
    return this.appService.findVault(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('myvault/:id')
  getMyAssignmentVault(@Req() req: any, @Param('id') assignmentId: string) {
    return this.appService.findAssignmentVault(req.user.userId, +assignmentId);
  }
}
