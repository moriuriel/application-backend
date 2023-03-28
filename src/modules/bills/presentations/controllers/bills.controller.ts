import { JwtAuthGuard } from '@Modules/auth/application/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BillInput, BillOutput } from '../contracts/bill.contract';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'contas', version: '1' })
@ApiTags('Contas')
export class BillsController {
  @Post()
  @ApiCreatedResponse({ type: BillOutput })
  async create(@Body() data: BillInput, @Res() response: Response) {
    return response.status(HttpStatus.CREATED).json(data);
  }
}
