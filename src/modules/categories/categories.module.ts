import { PrismaService } from '@Infra/prisma';
import { Module } from '@nestjs/common';
import { CategoriesController } from './presentations/controllers/categories.controller';

@Module({ controllers: [CategoriesController], providers: [PrismaService] })
export class CategoriesModule {}
