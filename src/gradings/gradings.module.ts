import { Module } from '@nestjs/common';
import { GradingsService } from './gradings.service';
import { GradingsController } from './gradings.controller';

@Module({
  controllers: [GradingsController],
  providers: [GradingsService]
})
export class GradingsModule {}
