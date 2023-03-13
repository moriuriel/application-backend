import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CardInput, CardOutput } from '../contracts/card.contract';

@Controller({ path: 'cards', version: '1' })
@ApiTags('Cartões')
export class CardControlloer {
  @Post()
  @ApiCreatedResponse({ type: CardOutput })
  async create(@Body() body: CardInput, @Res() response: Response) {
    return response.status(HttpStatus.CREATED).json(body);
  }
}
