import { Bill } from '@Modules/bills/domain/entities/Bill';

export type FindBillsOutput = {
  id: string;
  title: string;
  tag: string;
  amount: number;
  isPaid: boolean;
  cardId: string;
  cardName: string;
  categoryName: string;
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
        amount: Number(bill.amount.toFixed(2)),
        isPaid: bill.isPaid,
        cardId: bill.cardId,
        ownerId: bill.ownerId,
        categoriesId: bill.categoriesId,
        cardName: bill.cardTag,
        categoryName: bill.categoryName,
        createdAt: bill.createdAt,
        updatedAt: bill.updatedAt,
      };
    });
  }
}
