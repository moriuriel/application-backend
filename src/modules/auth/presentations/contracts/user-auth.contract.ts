import { ApiProperty } from '@nestjs/swagger';

export class AuthInput {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class AuthOutput {
  @ApiProperty()
  token: string;
}
