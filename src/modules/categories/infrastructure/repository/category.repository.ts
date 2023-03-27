import { PrismaService } from '@Infra/prisma';
import { ICategoryRepository } from '@Modules/categories/data/protocols/repository/category.repository';
import { Category } from '@Modules/categories/domain/entities/Category';
import { Injectable } from '@nestjs/common';
import { CategoryMapper } from '../mappers/category.mapper';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(category: Category): Promise<Category> {
    const categoryData = CategoryMapper.toPersistence(category);

    const rawCategory = await this.prismaService.categories.create({
      data: categoryData,
    });

    return CategoryMapper.toDomain(rawCategory);
  }

  async update(category: Category): Promise<Category> {
    const categoryData = CategoryMapper.toPersistence(category);

    const rawCategory = await this.prismaService.categories.update({
      where: { id: categoryData.id },
      data: categoryData,
    });

    return CategoryMapper.toDomain(rawCategory);
  }

  async findActiveByOwnerId(ownerId: string): Promise<Category[]> {
    const rawCategory = await this.prismaService.categories.findMany({
      where: { isActive: true, ownerId },
    });

    return rawCategory.map((category) => CategoryMapper.toDomain(category));
  }

  async findByNameAndOwnerId(name: string, ownerId: string): Promise<Category> {
    const rawCategory = await this.prismaService.categories.findFirst({
      where: { name, ownerId },
    });

    return CategoryMapper.toDomain(rawCategory);
  }
}
