import { JwtAuthGuard } from '@Modules/auth/application/guards/jwt-auth.guard';
import { CreateCategoryUseCase } from '@Modules/categories/application/use-cases/create-category.usecase';
import { FindCategoriesByOwnerUseCase } from '@Modules/categories/application/use-cases/find-category-owner.usecase';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import {
  CategoryInput,
  CategoryOutput,
  UpdateCategoryInput,
} from '../contracts/categories.contract';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'categories', version: '1' })
@ApiTags('Categorias')
export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly findCategoriesByOwnerUseCase: FindCategoriesByOwnerUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CategoryOutput })
  async create(
    @Body() body: CategoryInput,
    @Res() response: Response,
    @Request() req,
  ) {
    const { name } = body;
    const { id } = req.user;

    const output = await this.createCategoryUseCase.execute({
      name,
      ownerId: id,
    });

    return response.status(HttpStatus.CREATED).json(output);
  }

  @Get()
  @ApiOkResponse({ type: CategoryOutput, isArray: true })
  async index(@Res() response: Response, @Request() req) {
    const { id } = req.user;

    const output = await this.findCategoriesByOwnerUseCase.execute({
      ownerId: id,
    });

    return response.status(HttpStatus.CREATED).json(output);
  }

  @Put(':category_id')
  @ApiAcceptedResponse({ type: CategoryOutput })
  async update(
    @Body() body: UpdateCategoryInput,
    @Res() response: Response,
    @Request() req,
  ) {
    const { name, isActive } = body;
    const { id } = req.user;

    const output = { name, id, isActive };

    return response.status(HttpStatus.ACCEPTED).json(output);
  }

  @Delete(':category_id')
  @ApiAcceptedResponse({ type: CategoryOutput })
  async delete(
    @Body() body: UpdateCategoryInput,
    @Res() response: Response,
    @Request() req,
  ) {
    const { name, isActive } = body;
    const { id } = req.user;

    const output = { name, id, isActive };

    return response.status(HttpStatus.ACCEPTED).json(output);
  }
}
