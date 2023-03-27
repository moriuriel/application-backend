import { Category } from '@Modules/categories/domain/entities/Category';

export interface ICategoryRepository {
  create(category: Category): Promise<Category>;
  update(category: Category): Promise<Category>;
  findByNameAndOwnerId(name: string, ownerId: string): Promise<Category>;
  findActiveByOwnerId(ownerId: string): Promise<Category[]>;
}
