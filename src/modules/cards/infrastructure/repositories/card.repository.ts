import { PrismaService } from '@Infra/prisma';
import { ICardRepository } from '@Modules/cards/data/protocols/repositories/card.repository';
import { Card } from '@Modules/cards/domain/entities/Card';
import { Injectable } from '@nestjs/common';
import { CardMapper } from '../mappers/card.mapper';

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

    return CardMapper.toDomain(rawCard);
  }

  async findByTagAndOwnerId(tag: string, ownerId: string): Promise<Card> {
    const rawCard = await this.prismaService.cards.findFirst({
      where: { ownerId, tag },
    });

    return CardMapper.toDomain(rawCard);
  }

  async findActiveTagAndOwnerId(ownerId: string): Promise<Card[]> {
    const rawCards = await this.prismaService.cards.findMany({
      where: { isActive: true, ownerId },
    });

    return rawCards.map((card) => CardMapper.toDomain(card));
  }
}
