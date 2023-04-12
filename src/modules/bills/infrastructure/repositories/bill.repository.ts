import { PrismaService } from '@Infra/prisma';
import {
  FindBillsInput,
  IBillRepository,
} from '@Modules/bills/data/protocols/repositories/bill.repository';
import { Bill } from '@Modules/bills/domain/entities/Bill';
import { Injectable } from '@nestjs/common';
import { BillMapper } from '../mappers/bill.mapper';

@Injectable()
export class BillRepository implements IBillRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(bill: Bill): Promise<Bill> {
    const billData = BillMapper.toPersistence(bill);

    const rawBill = await this.prismaService.bills.create({
      data: {
        tag: billData.tag,
        title: billData.title,
        amount: billData.amount,
        cardId: billData.cardId,
        categoriesId: billData.categoriesId,
        hasInstallments: billData.hasInstallments,
        ownerId: billData.ownerId,
      },
    });

    return BillMapper.toDomain(rawBill);
  }

  public async findByIdAndOwnerId(
    billId: string,
    ownerId: string,
  ): Promise<Bill> {
    const rawBill = await this.prismaService.bills.findFirst({
      where: { id: billId, ownerId },
    });

    return BillMapper.toDomain(rawBill);
  }

  public async findBills(input: FindBillsInput): Promise<Bill[]> {
    const { ownerId, cardId, categoriesId, hasInstallments, isPaid } = input;

    const rawBills = await this.prismaService.bills.findMany({
      where: {
        ownerId,
        ...(cardId && { cardId }),
        ...(categoriesId && { categoriesId }),
        ...(hasInstallments && { hasInstallments }),
        ...(isPaid && { isPaid }),
      },
      include: { card: true, Categories: true },
    });
    return rawBills.map((raw) => BillMapper.toDomain(raw));
  }
}
