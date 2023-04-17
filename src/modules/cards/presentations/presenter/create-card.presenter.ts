import { Card } from '@Modules/cards/domain/entities/Card';

export type CardOutput = {
  id: string;
  tag: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

export class CreateCardPresenter {
  static Output(card: Card): CardOutput {
    return {
      id: card.id,
      tag: card.tag,
      ownerId: card.ownerId,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
      isActive: card.isActive,
    };
  }
}
