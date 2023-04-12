import { ApiProperty } from '@nestjs/swagger';

export class CardStatsOutput {
  @ApiProperty()
  tag: string;
  @ApiProperty()
  total: number;
  @ApiProperty()
  totalPercent: number;
}

export class BillsStatsOutput {
  @ApiProperty()
  amountPaid: number;
  @ApiProperty()
  amountToBePaid: number;
  @ApiProperty()
  amountPaidLastMonth: number;
  @ApiProperty()
  inCrescent: boolean;
}

export class StatsOutput {
  @ApiProperty({ isArray: true, type: CardStatsOutput })
  cards: CardStatsOutput[];
  @ApiProperty()
  bills: BillsStatsOutput;
  @ApiProperty()
  totalPaid: number;
}
