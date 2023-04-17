import { BcryptAdapter } from '@Infra/cryptography';
import { PrismaService } from '@Infra/prisma';
import { Module } from '@nestjs/common';
import {
  CreateUserUseCase,
  FindUserByIdUseCase,
  UpdateUserUseCase,
} from './application/use-cases';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserController } from './presentations/controllers/users.controller';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    FindUserByIdUseCase,
    UpdateUserUseCase,
    UserRepository,
    {
      provide: 'CryptographyAdapter',
      useFactory: () => {
        return new BcryptAdapter(10);
      },
    },
  ],
  exports: [UserRepository],
})
export class UsersModule {}
