import {
  BillsPaidOutput,
  CardStatsOutput,
} from '@Modules/dashboard/data/protocols/dashboard.repository';

export class DashboardMapper {
  public static toMostUsedCards(raw: CardStatsOutput): CardStatsOutput {
    return {
      tag: raw.tag,
      total: raw.total,
    };
  }

  public static toStatsBills(raw: BillsPaidOutput): BillsPaidOutput {
    return {
      amountPaid: raw[0].amountPaid,
    };
  }

  p;
}
