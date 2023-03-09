import { PrismaService } from '@Infra/prisma';
import {
  User,
  UnmarshalledUser,
} from '@Modules/users/domain/entites/user.entity';
import { IUserRepository } from '@Modules/users/domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<UnmarshalledUser> {
    const userRaw = await this.prismaService.users.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return UserMapper.toDomain(userRaw);
  }
}
