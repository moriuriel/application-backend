import { JwtAuthGuard } from '@Modules/auth/application/guards/jwt-auth.guard';
import { CreateCardUseCase } from '@Modules/cards/application/use-cases/create-card.usecase';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CardInput, CardOutput } from '../contracts/card.contract';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'cards', version: '1' })
@ApiTags('Cartões')
export class CardController {
  constructor(private readonly createCardUseCase: CreateCardUseCase) {}

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
}
