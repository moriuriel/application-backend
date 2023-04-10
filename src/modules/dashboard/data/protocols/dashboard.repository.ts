export type CardStatsOutput = {
  tag: string;
  total: number;
};

export type BillsPaidOutput = {
  amountPaid: number;
};

export type BillsPaidInLastMonthOutput = {
  amountPaidInLastMonth: number;
};

export interface IDashboardRepository {
  getMostUsedCards(ownerId: string): Promise<CardStatsOutput[]>;
  getBillsCurrentMonth(
    ownerId: string,
    isPaid: boolean,
  ): Promise<BillsPaidOutput>;
  getBillsIsPaidInLastMonth(
    ownerId: string,
  ): Promise<BillsPaidInLastMonthOutput>;
}
