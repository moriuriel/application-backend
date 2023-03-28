import { BillRepository } from '@Modules/bills/infrastructure/repositories/bill.repository';
import {
  FindBillsOutput,
  FindBillsPresenter,
} from '@Modules/bills/presentations/presenter/find-bills.presenter';
import { Injectable } from '@nestjs/common';

export type FindBillsInput = {
  ownerId: string;
  isPaid?: boolean;
  hasInstallments?: boolean;
  categoriesId?: string;
  cardId?: string;
};

export interface IFindBillsUsecase {
  execute(input: FindBillsInput): Promise<FindBillsOutput[]>;
}

@Injectable()
export class FindBillsUsecase implements IFindBillsUsecase {
  constructor(private readonly billRepository: BillRepository) {}

  public async execute(input: FindBillsInput): Promise<FindBillsOutput[]> {
    const bills = await this.billRepository.findBills(input);

    const output = FindBillsPresenter.output(bills);

    return output;
  }
}
