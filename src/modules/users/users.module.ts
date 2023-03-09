import { PrismaService } from '@Infra/prisma';
import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases';
import { UserController } from './presentations/controllers/users.controller';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { BcryptAdapter } from '@Infra/cryptography';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    UserRepository,
    {
      provide: 'CryptographyAdapter',
      useClass: BcryptAdapter,
    },
  ],
})
export class UsersModule {}
