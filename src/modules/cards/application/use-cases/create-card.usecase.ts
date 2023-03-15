import { Card } from '@Modules/cards/domain/entities/Card';
import { CardRepository } from '@Modules/cards/infrastructure/repositories/card.repository';
import { CardOutput } from '@Modules/cards/presentations/presenter/create-card.presenter';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';

type CreateCardInput = {
  tag: string;
  ownerId: string;
};

export interface ICreateCardUseCase {
  execute(input: CreateCardInput): Promise<CardOutput>;
}

@Injectable()
export class CreateCardUseCase implements ICreateCardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  public async execute(input: CreateCardInput): Promise<CardOutput> {
    const cardAlereadyExists = await this.cardRepository.findByTagAndOwnerId(
      input.tag,
      input.ownerId,
    );

    if (cardAlereadyExists) {
      throw new UnprocessableEntityException('Card Aleready Exists');
    }

    const card = new Card({
      tag: input.tag,
      ownerId: input.ownerId,
      isActive: true,
    });

    const createdCard = await this.cardRepository.create(card);

    return createdCard;
  }
}
