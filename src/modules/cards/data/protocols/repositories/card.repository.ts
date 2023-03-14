import { Card } from '@Modules/cards/domain/entities/Card';

export interface ICardRepository {
  create(card: Card): Promise<Card>;
}
