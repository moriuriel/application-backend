import { User } from '@Modules/users/domain/entites/user.entity';
import { UserRepository } from '@Modules/users/infrastructure/repositories/user.repository';
import { Injectable } from '@nestjs/common';

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
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(input: CreateUserInput): Promise<CreateUserInput> {
    const user = new User({
      name: input.name,
      email: input.email,
      password: input.password,
    });

    await this.userRepository.create(user);

    return user.unmarshal();
  }
}
