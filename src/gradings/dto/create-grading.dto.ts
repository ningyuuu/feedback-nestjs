import { ApiProperty } from '@nestjs/swagger';

export class CreateGradingDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  marks: number;
}
