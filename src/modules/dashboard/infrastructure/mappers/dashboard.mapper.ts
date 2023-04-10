import {
  BillsPaidInLastMonthOutput,
  BillsPaidOutput,
  CardStatsOutput,
} from '@Modules/dashboard/data/protocols/dashboard.repository';

export class DashboardMapper {
  public static toMostUsedCards(raw: CardStatsOutput): CardStatsOutput {
    return {
      tag: raw.tag,
      total: Number(raw.total),
    };
  }

  public static toAmountPaid(raw: BillsPaidOutput): BillsPaidOutput {
    return {
      amountPaid: raw[0].amountPaid,
    };
  }

  public static toAmountPaidInLastMonth(
    raw: unknown,
  ): BillsPaidInLastMonthOutput {
    return {
      amountPaidInLastMonth: raw[0].amountPaid,
    };
  }
}
