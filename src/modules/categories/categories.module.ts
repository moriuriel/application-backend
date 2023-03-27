import { PrismaService } from '@Infra/prisma';
import { Module } from '@nestjs/common';
import { CreateCategoryUseCase } from './application/use-cases/create-category.usecase';
import { FindCategoriesByOwnerUseCase } from './application/use-cases/find-category-owner.usecase';
import { CategoryRepository } from './infrastructure/repository/category.repository';
import { CategoriesController } from './presentations/controllers/categories.controller';

@Module({
  controllers: [CategoriesController],
  providers: [
    PrismaService,
    CategoryRepository,
    CreateCategoryUseCase,
    FindCategoriesByOwnerUseCase,
  ],
})
export class CategoriesModule {}
