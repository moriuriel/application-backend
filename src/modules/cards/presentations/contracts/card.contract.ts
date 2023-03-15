import { ApiProperty } from '@nestjs/swagger';

export class CardInput {
  @ApiProperty()
  tag: string;
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
