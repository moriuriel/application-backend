import { CardStatsOutput as CardStatsInput } from '@Modules/dashboard/data/protocols/dashboard.repository';

export type BillsStatsOutput = {
  amountPaid: string;
  amountToBePaid: string;
  amountPaidLastMonth: string;
  inCrescent: boolean;
};

export type CardStatsOutput = {
  tag: string;
  total: number;
  totalPercent: number;
};

export type BillsPresenterInput = {
  cards: CardStatsInput[];
  amountPaid: number;
  amountToBePaid: number;
  amountPaidLastMonth: number;
  inCrescent: boolean;
  totalPaid: number;
};

export type StatsOutput = {
  cards: CardStatsOutput[];
  bills: BillsStatsOutput;
  totalPaid: number;
};

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 2,
});
export class GetStastPresenter {
  public static output({
    cards,
    amountPaid,
    amountToBePaid,
    amountPaidLastMonth,
    inCrescent,
    totalPaid,
  }: BillsPresenterInput): StatsOutput {
    return {
      totalPaid: totalPaid,
      bills: {
        amountPaid: formatter.format(amountPaid),
        amountToBePaid: formatter.format(amountToBePaid),
        amountPaidLastMonth: formatter.format(amountPaidLastMonth),
        inCrescent,
      },
      cards: cards.map((card) => {
        return {
          total: card.total,
          tag: card.tag,
          totalPercent: this.valueToPercent(card.total, 0, totalPaid),
        };
      }),
    };
  }

  private static valueToPercent(
    value: number,
    min: number,
    max: number,
  ): number {
    return ((value - min) * 100) / (max - min);
  }
}
