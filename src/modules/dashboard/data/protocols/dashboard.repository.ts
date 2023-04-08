export type CardStatsOutput = {
  tag: string;
  total: string;
};

export type BillsPaidOutput = {
  amountPaid: number;
};

export interface IDashboardRepository {
  getMostUsedCards(ownerId: string): Promise<CardStatsOutput[]>;
  getBillsIsPaid(ownerId: string): Promise<BillsPaidOutput>;
}
