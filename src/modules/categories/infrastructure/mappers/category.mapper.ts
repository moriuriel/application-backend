import {
  Category,
  UnmarshalledCategory,
} from '@Modules/categories/domain/entities/Category';

export class CategoryMapper {
  static toDomain(rawCategory: UnmarshalledCategory): Category {
    return Category.create(rawCategory);
  }

  static toPersistence(category: Category): UnmarshalledCategory {
    return {
      name: category.name,
      isActive: category.isActive,
      ownerId: category.ownerId,
    };
  }
}
