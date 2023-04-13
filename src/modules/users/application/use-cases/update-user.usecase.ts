import { Hasher } from '@Data/protocols/cryptography';
import { User } from '@Modules/users/domain/entites/user.entity';
import { UserRepository } from '@Modules/users/infrastructure/repositories/user.repository';
import {
  UserOutput,
  UserPresenter,
} from '@Modules/users/presentations/presenter/user.presenter';
import { Inject, Injectable } from '@nestjs/common';

type UpdateUserInput = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export interface IUpdateUserUseCase {
  execute(input: UpdateUserInput): Promise<UserOutput>;
}

@Injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('CryptographyAdapter') private readonly haser: Hasher,
  ) {}

  public async execute(input: UpdateUserInput): Promise<UserOutput> {
    const userAlereadyExists = await this.userRepository.findByEmail(
      input.email,
    );

    const hasedPassword = await this.haser.hash(input.password);

    const user = new User({
      name: input.name,
      email: userAlereadyExists.email,
      password: hasedPassword,
      isActive: false,
      isConfirmed: false,
    });

    const updatedUser = await this.userRepository.update(user);

    return UserPresenter.output(updatedUser);
  }
}
