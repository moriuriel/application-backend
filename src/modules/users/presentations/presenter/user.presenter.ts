import { User } from '@Modules/users/domain/entites/user.entity';

export type UserOutput = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isConfirmed: boolean;
};

export class UserPresenter {
  static output(user: User): UserOutput {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isActive: user.isActive,
      isConfirmed: user.isConfirmed,
    };
  }
}
