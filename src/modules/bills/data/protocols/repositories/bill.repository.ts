import { Bill } from '@Modules/bills/domain/entities/Bill';

export interface IBillRepository {
  create(bill: Bill): Promise<Bill>;
  finByIdAndOwnerId(billId: string, ownerId: string): Promise<Bill>;
}
