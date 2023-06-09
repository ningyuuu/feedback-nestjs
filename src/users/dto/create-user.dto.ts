import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  admin?: boolean;
}
