import { Category } from '@Modules/categories/domain/entities/Category';

export type FindCategoriesByOwnerOutput = {
  id: string;
  name: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

export class FindCategoriesByOwnerPresenter {
  static output(categories: Category[]): FindCategoriesByOwnerOutput[] {
    return categories.map((category) => {
      return {
        id: category.id,
        name: category.name,
        ownerId: category.ownerId,
        isActive: category.isActive,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      };
    });
  }
}
