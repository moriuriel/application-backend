import { IUserRepository } from '@Modules/users/domain/repositories/user.repository';
import { InMemoryUserRepository } from '@Modules/users/infrastructure/repositories/InMemory/in-memory-user.repository';
import { UserRepository } from '@Modules/users/infrastructure/repositories/user.repository';
import { Test } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user.usecase';

const CryptographyAdapterMock = {
  hash: jest.fn(),
};

const makeSut = async () => {
  const moduleRef = await Test.createTestingModule({
    providers: [
      CreateUserUseCase,
      {
        provide: 'CryptographyAdapter',
        useValue: CryptographyAdapterMock,
      },
      {
        provide: UserRepository,
        useFactory: () => {
          return new InMemoryUserRepository();
        },
      },
    ],
  }).compile();

  return {
    createUserUseCase: moduleRef.get<CreateUserUseCase>(CreateUserUseCase),
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
    const { createUserUseCase, userRepository } = await makeSut();

    expect(createUserUseCase).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  test('should be create valid user', async () => {
    const { createUserUseCase, userRepository } = await makeSut();

    const repositorySpy = jest.spyOn(userRepository, 'create');

    const result = await createUserUseCase.execute(userEntity);

    expect(result.email).toBe(userEntity.email);

    expect(repositorySpy).toBeCalledTimes(1);
  });
});
