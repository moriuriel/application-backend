import { PrismaService } from '@Infra/prisma';
import { IUserRepository } from '@Modules/users/data/protocols/repositories/user.repository';
import { User } from '@Modules/users/domain/entites/user.entity';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<User> {
    const userRaw = await this.prismaService.users.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return UserMapper.toDomain(userRaw);
  }

  async findByEmail(email: string): Promise<User> {
    const userRaw = await this.prismaService.users.findUnique({
      where: { email },
    });

    return UserMapper.toDomain(userRaw);
  }

  async findById(id: string): Promise<User> {
    const userRaw = await this.prismaService.users.findUnique({
      where: { id },
    });

    return UserMapper.toDomain(userRaw);
  }

  async update(user: User): Promise<User> {
    const userRaw = await this.prismaService.users.update({
      where: {
        id: user.id,
        email: user.email,
      },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        updatedAt: new Date(Date.now()),
      },
    });

    return UserMapper.toDomain(userRaw);
  }
}
