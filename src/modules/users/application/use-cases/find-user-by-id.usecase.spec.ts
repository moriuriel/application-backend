import {
  UnmarshalledUser,
  User,
} from '@Modules/users/domain/entites/user.entity';
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

const userEntity: UnmarshalledUser = {
  email: 'valid-email',
  name: 'valid-name',
  password: 'valid-password',
  isActive: false,
  isConfirmed: false,
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

  test('should be find user by id', async () => {
    const { findByIdUserUseCase, userRepository } = await makeSut();

    const repositorySpy = jest.spyOn(userRepository, 'findById');

    const user = new User(userEntity);

    const userCreated = await userRepository.create(user);

    const result = await findByIdUserUseCase.execute({
      id: userCreated.id,
    });

    expect(repositorySpy).toBeCalledWith(userCreated.id);

    expect(result).toHaveProperty('id');
  });
});
