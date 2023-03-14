type UnmarshalledCard = {
  id?: string;
  tag: string;
  ownerId: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
export class Card {
  private readonly card: UnmarshalledCard;

  public constructor(props: UnmarshalledCard) {
    this.card = props;
  }

  public get id(): string {
    return this.card.id;
  }

  public get tag(): string {
    return this.card.tag;
  }

  public get createdAt(): Date {
    return this.card.createdAt;
  }

  public get updatedAt(): Date {
    return this.card.updatedAt;
  }

  public get isActive(): boolean {
    return this.card.isActive;
  }
}
