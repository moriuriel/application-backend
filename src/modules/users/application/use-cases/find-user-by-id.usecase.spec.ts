import { IUserRepository } from '@Modules/users/domain/repositories/user.repository';
import { InMemoryUserRepository } from '@Modules/users/infrastructure/repositories/InMemory/inMemoryUser.repository';
import { UserRepository } from '@Modules/users/infrastructure/repositories/user.repository';
import { UnprocessableEntityException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  FindUserByIdUseCase,
  IFindUserByIdUseCase,
} from './find-user-by-id.usecase';

const makeSut = async () => {
  const moduleRef = await Test.createTestingModule({
    providers: [
      FindUserByIdUseCase,
      {
        provide: UserRepository,
        useFactory: () => {
          return new InMemoryUserRepository();
        },
      },
    ],
  }).compile();

  return {
    findByIdUserUseCase:
      moduleRef.get<IFindUserByIdUseCase>(FindUserByIdUseCase),
    userRepository: moduleRef.get<IUserRepository>(UserRepository),
  };
};

const userEntity = {
  email: 'valid-email',
  name: 'valid-name',
  password: 'valid-password',
};

describe('Create user use case', () => {
  test('should be defined', async () => {
    const { findByIdUserUseCase, userRepository } = await makeSut();

    expect(findByIdUserUseCase).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  test('should be exception for user not found', async () => {
    const { findByIdUserUseCase } = await makeSut();

    expect(
      findByIdUserUseCase.execute({ id: 'invalid-id' }),
    ).rejects.toBeInstanceOf(UnprocessableEntityException);
  });
});
