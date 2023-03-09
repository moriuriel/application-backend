import { PrismaService } from '@Infra/prisma';
import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases';
import { UserController } from './http/controllers/users.controller';

@Module({
  controllers: [UserController],
  providers: [PrismaService, CreateUserUseCase],
})
export class UsersModule {}
