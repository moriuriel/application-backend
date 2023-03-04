import { PrismaService } from '@Infra/prisma';
import { Module } from '@nestjs/common';
import { UserController } from './http/controllers/users.controller';

@Module({ controllers: [UserController], providers: [PrismaService] })
export class UsersModule {}
