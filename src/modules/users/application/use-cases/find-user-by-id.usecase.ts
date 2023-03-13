import { UserRepository } from '@Modules/users/infrastructure/repositories/user.repository';
import {
  UserOutput,
  UserPresenter,
} from '@Modules/users/presentations/presenter/user.presenter';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';

type FindUserByIdInput = {
  id: string;
};

export interface IFindUserByIdUseCase {
  execute(input: FindUserByIdInput): Promise<UserOutput>;
}

@Injectable()
export class FindUserByIdUseCase implements IFindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: FindUserByIdInput): Promise<UserOutput> {
    const user = await this.userRepository.findById(input.id);

    if (!user) {
      throw new UnprocessableEntityException('user not found');
    }

    return UserPresenter.output(user);
  }
}
