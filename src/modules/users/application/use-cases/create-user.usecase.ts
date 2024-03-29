import { Hasher } from '@Data/protocols/cryptography';
import { User } from '@Modules/users/domain/entites/user.entity';
import { UserRepository } from '@Modules/users/infrastructure/repositories/user.repository';
import {
  UserOutput,
  UserPresenter,
} from '@Modules/users/presentations/presenter/user.presenter';
import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

type CreateUserInput = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

export interface ICreateUserUseCase {
  execute(input: CreateUserInput): Promise<UserOutput>;
}

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('CryptographyAdapter') private readonly haser: Hasher,
  ) {}

  public async execute(input: CreateUserInput): Promise<UserOutput> {
    const userAlereadyExists = await this.userRepository.findByEmail(
      input.email,
    );

    if (userAlereadyExists) {
      throw new UnprocessableEntityException('User Aleready Exists');
    }

    const hasedPassword = await this.haser.hash(input.password);

    const user = new User({
      name: input.name,
      email: input.email,
      password: hasedPassword,
      isActive: false,
      isConfirmed: false,
    });

    const createdUser = await this.userRepository.create(user);

    return UserPresenter.output(createdUser);
  }
}
