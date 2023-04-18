import { UserRepository } from '@Modules/users/infrastructure/repositories/user.repository';
import { Injectable } from '@nestjs/common';

export type DeleteUserUseCaseInput = {
  id: string;
};

export interface IDeleteUserUseCase {
  execute(input: DeleteUserUseCaseInput): Promise<void>;
}

@Injectable()
export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: DeleteUserUseCaseInput): Promise<void> {
    await this.userRepository.delete(input.id);
  }
}
