import { Bill } from '@Modules/bills/domain/entities/Bill';

export type CreateBillOutput = {
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

export class CreateBillPresenter {
  public static output(bill: Bill): CreateBillOutput {
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
  }
}
