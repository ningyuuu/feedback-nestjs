import { Module } from '@nestjs/common';
import { ScriptsService } from './scripts.service';
import { ScriptsController } from './scripts.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Script } from './entities/script.entity';
import { AssignmentsModule } from 'src/assignments/assignments.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MikroOrmModule.forFeature([Script]), AssignmentsModule, UsersModule],
  controllers: [ScriptsController],
  providers: [ScriptsService],
})
export class ScriptsModule {}
