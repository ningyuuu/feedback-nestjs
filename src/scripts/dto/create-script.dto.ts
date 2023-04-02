import { ApiProperty } from '@nestjs/swagger';

export class CreateScriptDto {
  @ApiProperty()
  assignment: number;

  @ApiProperty()
  file: string;
}
