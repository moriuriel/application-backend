import { Card } from '@Modules/cards/domain/entities/Card';
import { CardRepository } from '@Modules/cards/infrastructure/repositories/card.repository';
import { InMemoryCardRepository } from '@Modules/cards/infrastructure/repositories/in-memory/in-memory-card.repository';
import { UnprocessableEntityException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CreateCardUseCase } from './create-card.usecase';

const makeSut = async () => {
  const moduleRef = await Test.createTestingModule({
    providers: [
      CreateCardUseCase,
      {
        provide: CardRepository,
        useClass: InMemoryCardRepository,
      },
    ],
  }).compile();

  return {
    useCase: moduleRef.get<CreateCardUseCase>(CreateCardUseCase),
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

  test('should be create valid card', async () => {
    const { repository, useCase } = await makeSut();

    const repoSpyOn = jest.spyOn(repository, 'create');

    const result = await useCase.execute(cardEntity);

    expect(result).toHaveProperty('id');

    expect(result.tag).toBe(cardEntity.tag);

    expect(repoSpyOn).toBeCalled();
  });

  test('should be exception for duplicate tag ', async () => {
    const { repository, useCase } = await makeSut();

    await repository.create(new Card(cardEntity));

    expect(useCase.execute(cardEntity)).rejects.toBeInstanceOf(
      UnprocessableEntityException,
    );
  });
});
