import { PrismaService } from '@Infra/prisma';
import { Module } from '@nestjs/common';
import { CategoryRepository } from './infrastructure/repository/category.repository';
import { CategoriesController } from './presentations/controllers/categories.controller';

@Module({
  controllers: [CategoriesController],
  providers: [PrismaService, CategoryRepository],
})
export class CategoriesModule {}
