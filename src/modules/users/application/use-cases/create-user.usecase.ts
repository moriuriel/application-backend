import { Hasher } from '@Data/protocols/cryptography';
import { User } from '@Modules/users/domain/entites/user.entity';
import { UserRepository } from '@Modules/users/infrastructure/repositories/user.repository';
import { Inject, Injectable } from '@nestjs/common';

type CreateUserInput = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

export interface ICreateUserUseCase {
  execute(input: CreateUserInput): Promise<CreateUserInput>;
}

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('CryptographyAdapter') private readonly haser: Hasher,
  ) {}

  public async execute(input: CreateUserInput): Promise<CreateUserInput> {
    const user = new User({
      name: input.name,
      email: input.email,
      password: input.password,
    });

    const createdUser = await this.userRepository.create(user);

    return createdUser;
  }
}
