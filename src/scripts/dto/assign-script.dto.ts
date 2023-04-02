import { ApiProperty } from '@nestjs/swagger';

export class AssignScriptDto {
  @ApiProperty()
  assignee: number;
}
