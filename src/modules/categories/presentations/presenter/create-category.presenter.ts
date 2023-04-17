import { Category } from '@Modules/categories/domain/entities/Category';
import { CategoryOutput } from '../contracts/categories.contract';

export type CreateCategoryOutput = {
  id: string;
  name: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

export class CreateCategoryPresenter {
  static output(category: Category): CategoryOutput {
    return {
      id: category.id,
      name: category.name,
      isActive: category.isActive,
      ownerId: category.ownerId,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
