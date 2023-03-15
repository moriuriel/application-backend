import { JwtAuthGuard } from '@Modules/auth/application/guards/jwt-auth.guard';
import { FindCardByOwnerUsecase } from '@Modules/cards/application/use-cases/find-card-by-owner.useecase';
import {
  Controller,
  Get,
  HttpStatus,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CardOutput } from '../contracts/card.contract';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'cards', version: '1' })
@ApiTags('Cartões')
export class CardOwnerControlloer {
  constructor(
    private readonly findCardByOwnerUseCase: FindCardByOwnerUsecase,
  ) {}

  @Get('owner')
  @ApiOkResponse({ type: CardOutput })
  async create(@Res() response: Response, @Request() req) {
    const { id } = req.user;

    const output = await this.findCardByOwnerUseCase.execute({
      ownerId: id,
    });

    return response.status(HttpStatus.OK).json(output);
  }
}
