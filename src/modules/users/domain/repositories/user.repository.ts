import { UnmarshalledUser, User } from '../entites/user.entity';

export interface IUserRepository {
  create(user: User): Promise<UnmarshalledUser>;
}
