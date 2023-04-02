import { ApiProperty } from '@nestjs/swagger';

export class CreateAssignmentDto {
  @ApiProperty()
  project: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
