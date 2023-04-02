import { ApiProperty } from '@nestjs/swagger';

export class CreateGradingDto {
  @ApiProperty()
  assignment: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  marks: number;
}
