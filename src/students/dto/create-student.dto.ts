import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty()
  project: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}
