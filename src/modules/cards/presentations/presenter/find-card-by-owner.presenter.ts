import { Card } from '@Modules/cards/domain/entities/Card';

export type CardByOwnerOutput = {
  id: string;
  tag: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

export class FindCardByOwnerPresenter {
  static Output(cards: Card[]): CardByOwnerOutput[] {
    return cards.map((card) => {
      return {
        id: card.id,
        tag: card.tag,
        ownerId: card.ownerId,
        createdAt: card.createdAt,
        updatedAt: card.updatedAt,
        isActive: card.isActive,
      };
    });
  }
}
