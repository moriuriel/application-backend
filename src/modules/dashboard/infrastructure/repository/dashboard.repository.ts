import { PrismaService } from '@Infra/prisma';
import {
  BillsPaidOutput,
  CardStatsOutput,
  IDashboardRepository,
} from '@Modules/dashboard/data/protocols/dashboard.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardRepository implements IDashboardRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getMostUsedCards(ownerId: string): Promise<CardStatsOutput[]> {
    const raw = await this.prismaService
      .$queryRaw`SELECT cards.tag, sum(bills.amount) as total FROM bills
    INNER JOIN cards ON bills.cardId = cards.id
    WHERE bills.ownerId =  ${ownerId} and MONTH(bills.createdAt) = MONTH(now()) and isPaid = true
    GROUP BY bills.cardId;`;
    return raw as CardStatsOutput[];
  }

  public async getBillsIsPaid(ownerId: string): Promise<BillsPaidOutput> {
    const raw = await this.prismaService
      .$queryRaw`SELECT sum(bills.amount) as amountPaid FROM bills 
    WHERE bills.ownerId = ${ownerId} and isPaid = true
    and MONTH(bills.createdAt) = MONTH(now())`;
    console.log(raw);

    return { amountPaid: raw[0].amountPaid };
  }
}

/**
 * const raw: CardStatsOutput[] = await this.prismaService.$queryRaw<
      CardStatsOutput[]
    >`SELECT cards.tag, sum(bills.amount) as total FROM bills
    INNER JOIN cards ON bills.cardId = cards.id
    WHERE bills.ownerId = '${ownerId}' and MONTH(bills.createdAt) = MONTH(now())
    GROUP BY bills.cardId;`;

 */
