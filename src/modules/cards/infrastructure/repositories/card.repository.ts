import { PrismaService } from '@Infra/prisma';
import { ICardRepository } from '@Modules/cards/data/protocols/repositories/card.repository';
import { Card } from '@Modules/cards/domain/entities/Card';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CardRepository implements ICardRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(card: Card): Promise<Card> {
    const rawCard = await this.prismaService.cards.create({
      data: {
        tag: card.tag,
        ownerId: card.ownerId,
      },
    });

    return Card.create(rawCard);
  }
}
