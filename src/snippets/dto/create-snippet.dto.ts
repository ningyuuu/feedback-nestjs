import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSnippetDto {
  @ApiProperty()
  project: number;

  @ApiPropertyOptional()
  assignment?: number;

  @ApiProperty()
  text: string;
}
