import { Card } from '@Modules/cards/domain/entities/Card';

export interface ICardRepository {
  create(card: Card): Promise<Card>;
  findByTagAndOwnerId(tag: string, ownerId: string): Promise<Card>;
  findActiveTagAndOwnerId(ownerId: string): Promise<Card[]>;
}
