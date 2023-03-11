import { User } from '@Modules/users/domain/entites/user.entity';

export type CreateUserOutput = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export class CreateUserPresenter {
  static output(user: User): CreateUserOutput {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
