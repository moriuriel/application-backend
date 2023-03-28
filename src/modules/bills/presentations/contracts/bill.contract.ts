import { ApiProperty } from '@nestjs/swagger';

export class BillInput {
  @ApiProperty()
  title: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  tag: string;
  @ApiProperty()
  cardId: string;
  @ApiProperty()
  hasInstallments: boolean;
  @ApiProperty()
  isPaid: boolean;
  @ApiProperty()
  categoriesId: string;
}

export class BillOutput {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  tag: string;
  @ApiProperty()
  cardId: string;
  @ApiProperty()
  ownerId: string;
  @ApiProperty()
  hasInstallments: string;
  @ApiProperty()
  isPaid: string;
  @ApiProperty()
  categoryId: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
}
