import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [ProjectsModule],
})
export class AdminModule {}
