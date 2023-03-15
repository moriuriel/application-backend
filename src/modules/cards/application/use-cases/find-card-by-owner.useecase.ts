import { CardRepository } from '@Modules/cards/infrastructure/repositories/card.repository';
import {
  CardByOwnerOutput,
  FindCardByOwnerPresenter,
} from '@Modules/cards/presentations/presenter/find-card-by-owner.presenter';
import { Injectable } from '@nestjs/common';

type FindCardByUserInput = {
  ownerId: string;
};

export interface IFindCardByOwnerUsecase {
  execute(input: FindCardByUserInput): Promise<CardByOwnerOutput[]>;
}

@Injectable()
export class FindCardByOwnerUsecase implements IFindCardByOwnerUsecase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(input: FindCardByUserInput): Promise<CardByOwnerOutput[]> {
    const cards = await this.cardRepository.findActiveTagAndOwnerId(
      input.ownerId,
    );

    const output = FindCardByOwnerPresenter.Output(cards);

    return output;
  }
}
