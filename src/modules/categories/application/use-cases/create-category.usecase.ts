import { Category } from '@Modules/categories/domain/entities/Category';
import { CategoryRepository } from '@Modules/categories/infrastructure/repository/category.repository';
import {
  CreateCategoryOutput,
  CreateCategoryPresenter,
} from '@Modules/categories/presentations/presenter/create-category.presenter';
import { Injectable } from '@nestjs/common';

export type CreateCategoryInput = {
  ownerId: string;
  name: string;
};

export interface ICreateCategoryUseCase {
  execute(input: CreateCategoryInput): Promise<CreateCategoryOutput>;
}

@Injectable()
export class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async execute(
    input: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    const category = new Category({
      name: input.name,
      ownerId: input.ownerId,
      isActive: true,
    });

    const createdCategory = await this.categoryRepository.create(category);

    return CreateCategoryPresenter.output(createdCategory);
  }
}
