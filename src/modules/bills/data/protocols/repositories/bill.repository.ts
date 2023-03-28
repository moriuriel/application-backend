import { Bill } from '@Modules/bills/domain/entities/Bill';

export type FindBillsInput = {
  ownerId: string;
  isPaid?: boolean;
  hasInstallment?: boolean;
  categoriesId?: string;
  cardId?: string;
};

export interface IBillRepository {
  create(bill: Bill): Promise<Bill>;
  findByIdAndOwnerId(billId: string, ownerId: string): Promise<Bill>;
  findBills(input: FindBillsInput): Promise<Bill[]>;
}
