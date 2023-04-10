export type CardStatsOutput = {
  tag: string;
  total: number;
};

export type BillsPaidOutput = {
  amountPaid: number;
};

export interface IDashboardRepository {
  getMostUsedCards(ownerId: string): Promise<CardStatsOutput[]>;
  getBillsIsPaid(ownerId: string): Promise<BillsPaidOutput>;
}
