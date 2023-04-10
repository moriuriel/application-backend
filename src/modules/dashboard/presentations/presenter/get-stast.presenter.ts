import { CardStatsOutput } from '@Modules/dashboard/data/protocols/dashboard.repository';

export type BillsStatsOutput = {
  amountPaid: string;
  amountToBePaid: string;
  amountPaidLastMonth: string;
  inCrescent: boolean;
};

export type BillsPresenterInput = {
  cards: CardStatsOutput[];
  amountPaid: number;
  amountToBePaid: number;
  amountPaidLastMonth: number;
  inCrescent: boolean;
};

export type StatsOutput = {
  cards: CardStatsOutput[];
  bills: BillsStatsOutput;
};
const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});
export class GetStastPresenter {
  public static output({
    cards,
    amountPaid,
    amountToBePaid,
    amountPaidLastMonth,
    inCrescent,
  }: BillsPresenterInput): StatsOutput {
    return {
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
        };
      }),
    };
  }
}
