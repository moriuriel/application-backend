import { User } from '@Modules/users/domain/entites/user.entity';
import { IUserRepository } from '@Modules/users/domain/repositories/user.repository';

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users?.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users?.find((user) => user.id === id);
  }
}
