import { Module } from '@nestjs/common';
import { BillsController } from './presentations/controllers/bills.controller';

@Module({ controllers: [BillsController] })
export class BillsModule {}
