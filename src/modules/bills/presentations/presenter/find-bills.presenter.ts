import { Bill } from '@Modules/bills/domain/entities/Bill';

export type FindBillsOutput = {
  id: string;
  title: string;
  tag: string;
  isPaid: boolean;
  cardId: string;
  ownerId: string;
  categoriesId: string;
  createdAt: Date;
  updatedAt: Date;
};

export class FindBillsPresenter {
  public static output(bills: Bill[]): FindBillsOutput[] {
    return bills.map((bill) => {
      return {
        id: bill.id,
        title: bill.title,
        tag: bill.tag,
        isPaid: bill.isPaid,
        cardId: bill.cardId,
        ownerId: bill.ownerId,
        categoriesId: bill.categoriesId,
        createdAt: bill.createdAt,
        updatedAt: bill.updatedAt,
      };
    });
  }
}
