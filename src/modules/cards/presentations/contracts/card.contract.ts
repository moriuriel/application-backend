import { ApiProperty } from '@nestjs/swagger';

export class CardInput {
  @ApiProperty()
  name: string;
}

export class CardOutput {
  @ApiProperty()
  id: string;
  @ApiProperty()
  tag: string;
  @ApiProperty()
  ownerId: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  isActive: boolean;
}
