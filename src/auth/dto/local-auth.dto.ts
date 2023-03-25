import { ApiProperty } from '@nestjs/swagger';

export class LocalAuthDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
