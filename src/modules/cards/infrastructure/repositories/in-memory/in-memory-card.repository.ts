import { ICardRepository } from '@Modules/cards/data/protocols/repositories/card.repository';
import { Card, UnmarshalledCard } from '@Modules/cards/domain/entities/Card';
import { uuid } from 'uuidv4';

export class InMemoryCardRepository implements ICardRepository {
  private cards: Card[] = [];

  async create(card: Card): Promise<Card> {
    const unmarshalledCard: UnmarshalledCard = {
      id: uuid(),
      tag: card.tag,
      isActive: true,
      ownerId: card.ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newCard = new Card(unmarshalledCard);

    this.cards.push(newCard);

    return newCard;
  }

  async findByTagAndOwnerId(tag: string, ownerId: string): Promise<Card> {
    return this.cards?.find(
      (card) => card.tag === tag && card.ownerId === ownerId,
    );
  }

  async findActiveTagAndOwnerId(ownerId: string): Promise<Card[]> {
    return this.cards?.filter(
      (card) => card.ownerId === ownerId && card.isActive === true,
    );
  }
}
