import { ICategoryRepository } from '@Modules/categories/data/protocols/repository/category.repository';
import {
  Category,
  UnmarshalledCategory,
} from '@Modules/categories/domain/entities/Category';
import { uuid } from 'uuidv4';
import { CategoryMapper } from '../../mappers/category.mapper';

export class InMemoryCategoryRepository implements ICategoryRepository {
  private categories: Category[] = [];

  async create(category: Category): Promise<Category> {
    const unmarshalledCategory: UnmarshalledCategory = {
      id: uuid(),
      name: category.name,
      isActive: true,
      ownerId: category.ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newCategory = new Category(unmarshalledCategory);

    this.categories.push(newCategory);

    return newCategory;
  }

  async update(category: Category): Promise<Category> {
    const unmarshalledCategory: UnmarshalledCategory = {
      id: category.id,
      name: category.name,
      isActive: true,
      ownerId: category.ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const categoryIndex = this.categories.findIndex(
      (category) => category.id === unmarshalledCategory.id,
    );

    const newCategory = new Category(unmarshalledCategory);

    this.categories[categoryIndex] = newCategory;

    return newCategory;
  }

  async findActiveByOwnerId(ownerId: string): Promise<Category[]> {
    const rawCategory = await this.categories.filter(
      (category) => category.isActive === true && category.ownerId === ownerId,
    );

    return rawCategory.map((category) => CategoryMapper.toDomain(category));
  }

  async findByNameAndOwnerId(name: string, ownerId: string): Promise<Category> {
    const rawCategory = await this.categories.find(
      (category) => category.name === name && category.ownerId === ownerId,
    );

    return rawCategory;
  }
}
