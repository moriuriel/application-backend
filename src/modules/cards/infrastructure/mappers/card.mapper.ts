import { Card, UnmarshalledCard } from '@Modules/cards/domain/entities/Card';

export class CardMapper {
  static toDomain(rawCard: UnmarshalledCard): Card {
    return Card.create(rawCard);
  }
}
