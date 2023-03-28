import { Bill } from '@Modules/bills/domain/entities/Bill';
import { BillRepository } from '@Modules/bills/infrastructure/repositories/bill.repository';
import {
  CreateBillOutput,
  CreateBillPresenter,
} from '@Modules/bills/presentations/presenter/create-bill.presenter';
import { Injectable } from '@nestjs/common';

type CreateBillInput = {
  title: string;
  tag: string;
  hasInstallments: boolean;
  isPaid: boolean;
  cardId: string;
  ownerId: string;
  categoriesId: string;
  amount: number;
};

export interface ICreateBillUsecase {
  execute(input: CreateBillInput): Promise<CreateBillOutput>;
}

@Injectable()
export class CreateBillUsecase implements ICreateBillUsecase {
  constructor(private readonly billRepository: BillRepository) {}

  public async execute(input: CreateBillInput): Promise<CreateBillOutput> {
    const bill = new Bill(input);

    const createdBill = await this.billRepository.create(bill);

    const output = CreateBillPresenter.output(createdBill);

    return output;
  }
}
