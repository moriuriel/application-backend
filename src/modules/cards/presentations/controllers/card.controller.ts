import { JwtAuthGuard } from '@Modules/auth/application/guards/jwt-auth.guard';
import { CreateCardUseCase } from '@Modules/cards/application/use-cases/create-card.usecase';
import { FindCardByOwnerUseCase } from '@Modules/cards/application/use-cases/find-card-by-owner.useecase';
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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CardInput, CardOutput } from '../contracts/card.contract';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'cards', version: '1' })
@ApiTags('Cartões')
export class CardController {
  constructor(
    private readonly createCardUseCase: CreateCardUseCase,
    private readonly findCardByOwnerUseCase: FindCardByOwnerUseCase,
  ) {}

  @Get()
  @ApiOkResponse({ type: CardOutput })
  async index(@Res() response: Response, @Request() req) {
    const { id } = req.user;

    const output = await this.findCardByOwnerUseCase.execute({
      ownerId: id,
    });

    return response.status(HttpStatus.OK).json(output);
  }

  @Post()
  @ApiCreatedResponse({ type: CardOutput })
  async create(
    @Body() body: CardInput,
    @Res() response: Response,
    @Request() req,
  ) {
    const { tag } = body;
    const { id } = req.user;

    const output = await this.createCardUseCase.execute({ tag, ownerId: id });

    return response.status(HttpStatus.CREATED).json(output);
  }

  @Put(':card_id')
  @ApiCreatedResponse({ type: CardOutput })
  async update(
    @Body() body: CardInput,
    @Res() response: Response,
    @Request() req,
  ) {
    const { tag } = body;
    const { id } = req.user;

    const output = await this.createCardUseCase.execute({ tag, ownerId: id });

    return response.status(HttpStatus.CREATED).json(output);
  }

  @Delete(':card_id')
  @ApiCreatedResponse({ type: CardOutput })
  async delete(
    @Body() body: CardInput,
    @Res() response: Response,
    @Request() req,
  ) {
    const { tag } = body;
    const { id } = req.user;

    const output = await this.createCardUseCase.execute({ tag, ownerId: id });

    return response.status(HttpStatus.CREATED).json(output);
  }
}
