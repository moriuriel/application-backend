import { Cards, Categories } from '@prisma/client';

export type UnmarshalledBill = {
  id?: string;
  title: string;
  tag: string;
  amount: number;
  hasInstallments: boolean;
  isPaid: boolean;
  cardId: string;
  ownerId: string;
  categoriesId: string;
  card?: Cards;
  Categories?: Categories;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Bill {
  private readonly bill: UnmarshalledBill;

  public constructor(props: UnmarshalledBill) {
    this.bill = props;
  }

  public static create(props: UnmarshalledBill): Bill | undefined {
    if (props?.id) {
      const instance = new Bill(props);

      return instance;
    }
    return undefined;
  }

  public get id(): string {
    return this.bill.id;
  }

  public get title(): string {
    return this.bill.title;
  }

  public get tag(): string {
    return this.bill.tag;
  }

  public get cardId(): string {
    return this.bill.cardId;
  }

  public get isPaid(): boolean {
    return this.bill.isPaid;
  }

  public get hasInstallments(): boolean {
    return this.bill.hasInstallments;
  }

  public get categoriesId(): string {
    return this.bill.categoriesId;
  }

  public get ownerId(): string {
    return this.bill.ownerId;
  }

  public get createdAt(): Date {
    return this.bill.createdAt;
  }

  public get updatedAt(): Date {
    return this.bill.updatedAt;
  }

  public get amount(): number {
    return this.bill.amount;
  }

  public get categoryName(): string {
    return this.bill.Categories.name;
  }

  public get cardTag(): string {
    return this.bill.card.tag;
  }
}
