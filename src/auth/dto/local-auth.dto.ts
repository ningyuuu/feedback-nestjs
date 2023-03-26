import { ApiProperty } from '@nestjs/swagger';

export class LocalAuthDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;
}
