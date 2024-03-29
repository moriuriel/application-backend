import { PrismaService } from '@Infra/prisma';
import {
  BillsPaidInLastMonthOutput,
  BillsPaidOutput,
  CardStatsOutput,
  IDashboardRepository,
} from '@Modules/dashboard/data/protocols/dashboard.repository';
import { Injectable } from '@nestjs/common';
import { DashboardMapper } from '../mappers/dashboard.mapper';

@Injectable()
export class DashboardRepository implements IDashboardRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getMostUsedCards(ownerId: string): Promise<CardStatsOutput[]> {
    const raw: CardStatsOutput[] = await this.prismaService
      .$queryRaw`SELECT cards.tag, count(cards.id) as total FROM bills
    INNER JOIN cards ON bills."cardId" = cards.id
    WHERE bills."ownerId" = ${ownerId} 
    and date_trunc('month', bills."createdAt") = date_trunc('month', current_date)
    GROUP BY bills."cardId", cards.tag ORDER BY total DESC;`;

    return raw.map((r) => DashboardMapper.toMostUsedCards(r));
  }

  public async getBillsCurrentMonth(
    ownerId: string,
    isPaid: boolean,
  ): Promise<BillsPaidOutput> {
    const raw: BillsPaidOutput = await this.prismaService
      .$queryRaw`SELECT sum(bills.amount) as amountPaid FROM bills
      WHERE bills."ownerId" = ${ownerId} and bills."isPaid" = ${isPaid}
      and date_trunc('month', bills."createdAt") = date_trunc('month', current_date)`;

    return DashboardMapper.toAmountPaid(raw);
  }

  public async getBillsIsPaidInLastMonth(
    ownerId: string,
  ): Promise<BillsPaidInLastMonthOutput> {
    const raw: BillsPaidInLastMonthOutput = await this.prismaService
      .$queryRaw`SELECT sum(bills.amount) as amountpaid FROM bills 
    WHERE bills."ownerId" = ${ownerId} and bills."isPaid" = true
    and date_trunc('month', bills."createdAt") = date_trunc('month', current_date - interval '1' month)`;

    return DashboardMapper.toAmountPaidInLastMonth(raw);
  }
}
