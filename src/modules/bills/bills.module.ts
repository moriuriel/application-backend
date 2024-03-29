import { PrismaService } from '@Infra/prisma';
import { Module } from '@nestjs/common';
import { CreateBillUsecase } from './application/use-cases/create-bill.usecase';
import { FindBillsUsecase } from './application/use-cases/find-bills.usecase';
import { BillRepository } from './infrastructure/repositories/bill.repository';
import { BillsController } from './presentations/controllers/bills.controller';

@Module({
  controllers: [BillsController],
  providers: [
    PrismaService,
    BillRepository,
    CreateBillUsecase,
    FindBillsUsecase,
  ],
})
export class BillsModule {}
