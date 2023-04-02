import { Module } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { SnippetsController } from './snippets.controller';

@Module({
  controllers: [SnippetsController],
  providers: [SnippetsService]
})
export class SnippetsModule {}
