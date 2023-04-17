import { ApiProperty } from '@nestjs/swagger';

export class CategoryInput {
  @ApiProperty()
  name: string;
}

export class CategoryOutput {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  ownerId: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  isActive: boolean;
}

export class UpdateCategoryInput {
  @ApiProperty({ nullable: true, required: false })
  name: string;
  @ApiProperty({ nullable: true, required: false })
  isActive: boolean;
}
