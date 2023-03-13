import { uuid } from 'uuidv4';
import { IUserRepository } from '@Modules/users/domain/repositories/user.repository';
import {
  UnmarshalledUser,
  User,
} from '@Modules/users/domain/entites/user.entity';

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    const unmarshalledUser: UnmarshalledUser = {
      email: user.email,
      name: user.name,
      password: user.password,
      isActive: false,
      isConfirmed: false,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newUser = new User(unmarshalledUser);

    this.users.push(newUser);

    return newUser;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users?.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users?.find((user) => user.id === id);
  }
}
