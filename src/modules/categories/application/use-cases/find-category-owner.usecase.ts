import { CategoryRepository } from '@Modules/categories/infrastructure/repository/category.repository';
import {
  FindCategoriesByOwnerOutput,
  FindCategoriesByOwnerPresenter,
} from '@Modules/categories/presentations/presenter/find-category-owner.presenter';
import { Injectable } from '@nestjs/common';

export type FindCategoriesByOwnerInput = {
  ownerId: string;
};

export interface IFindCategoriesByOwnerUseCase {
  execute(
    input: FindCategoriesByOwnerInput,
  ): Promise<FindCategoriesByOwnerOutput[]>;
}

@Injectable()
export class FindCategoriesByOwnerUseCase
  implements IFindCategoriesByOwnerUseCase
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async execute(
    input: FindCategoriesByOwnerInput,
  ): Promise<FindCategoriesByOwnerOutput[]> {
    const categories = await this.categoryRepository.findActiveByOwnerId(
      input.ownerId,
    );

    return FindCategoriesByOwnerPresenter.output(categories);
  }
}
