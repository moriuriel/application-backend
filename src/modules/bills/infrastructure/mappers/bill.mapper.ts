import { Bill, UnmarshalledBill } from '@Modules/bills/domain/entities/Bill';

export class BillMapper {
  static toDomain(rawBill: UnmarshalledBill): Bill {
    return Bill.create(rawBill);
  }

  static toPersistence(bill: Bill): UnmarshalledBill {
    return {
      title: bill.title,
      ownerId: bill.ownerId,
      tag: bill.tag,
      cardId: bill.cardId,
      hasInstallments: bill.hasInstallments,
      categoriesId: bill.categoriesId,
      isPaid: bill.isPaid,
    };
  }
}
