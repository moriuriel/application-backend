import { Card } from '@Modules/cards/domain/entities/Card';
import { CardRepository } from '@Modules/cards/infrastructure/repositories/card.repository';
import { InMemoryCardRepository } from '@Modules/cards/infrastructure/repositories/in-memory/in-memory-card.repository';
import { Test } from '@nestjs/testing';
import { FindCardByOwnerUseCase } from './find-card-by-owner.useecase';

const makeSut = async () => {
  const moduleRef = await Test.createTestingModule({
    providers: [
      FindCardByOwnerUseCase,
      {
        provide: CardRepository,
        useClass: InMemoryCardRepository,
      },
    ],
  }).compile();

  return {
    useCase: moduleRef.get<FindCardByOwnerUseCase>(FindCardByOwnerUseCase),
    repository: moduleRef.get<CardRepository>(CardRepository),
  };
};

const cardEntity = {
  tag: 'valid-tag',
  ownerId: 'valid-ownerId',
  isActive: true,
};

describe('Create Card Use Case', () => {
  test('should be defined', async () => {
    const { repository, useCase } = await makeSut();

    expect(repository).toBeDefined();
    expect(useCase).toBeDefined();
  });

  test('should be return cards', async () => {
    const { repository, useCase } = await makeSut();

    await repository.create(new Card(cardEntity));

    const result = await useCase.execute({ ownerId: cardEntity.ownerId });

    expect(Array.isArray(result)).toBe(true);

    expect(result[0]).toHaveProperty('id');

    expect(result[0].tag).toBe(cardEntity.tag);
  });
});
