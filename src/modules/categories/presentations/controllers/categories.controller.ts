import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Request,
  Res,
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

@Controller({ path: 'categories', version: '1' })
@ApiTags('Categorias')
export class CategoriesController {
  @Post()
  @ApiCreatedResponse({ type: CategoryOutput })
  async create(
    @Body() body: CategoryInput,
    @Res() response: Response,
    @Request() req,
  ) {
    const { name } = body;
    const { id } = req.user;

    const output = { name, id };

    return response.status(HttpStatus.CREATED).json(output);
  }

  @Get()
  @ApiOkResponse({ type: CategoryOutput, isArray: true })
  async index(@Res() response: Response, @Request() req) {
    const { id } = req.user;

    const output = { id };

    return response.status(HttpStatus.CREATED).json(output);
  }

  @Put(':category_id')
  @ApiAcceptedResponse({ type: CategoryOutput })
  async update(
    @Body() body: UpdateCategoryInput,
    @Res() response: Response,
    @Request() req,
  ) {
    const { name } = body;
    const { id } = req.user;

    const output = { name, id };

    return response.status(HttpStatus.ACCEPTED).json(output);
  }
}
