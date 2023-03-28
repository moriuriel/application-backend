import { JwtAuthGuard } from '@Modules/auth/application/guards/jwt-auth.guard';
import { CreateBillUsecase } from '@Modules/bills/application/use-cases/create-bill.usecase';
import { FindBillsUsecase } from '@Modules/bills/application/use-cases/find-bills.usecase';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BillInput, BillOutput, BillQuery } from '../contracts/bill.contract';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'bills', version: '1' })
@ApiTags('Contas')
export class BillsController {
  constructor(
    private readonly createBillUsecase: CreateBillUsecase,
    private readonly findBillsUsecase: FindBillsUsecase,
  ) {}

  @Get()
  @ApiCreatedResponse({ type: BillOutput, isArray: true })
  async index(
    @Query() query: BillQuery,
    @Request() req,
    @Res() response: Response,
  ) {
    const { id } = req.user;

    const output = await this.findBillsUsecase.execute({
      isPaid: Boolean(query.isPaid),
      hasInstallments: Boolean(query.hasInstallments),
      cardId: query.cardId,
      categoriesId: query.categoriesId,
      ownerId: id,
    });

    return response.status(HttpStatus.OK).json(output);
  }

  @Post()
  @ApiCreatedResponse({ type: BillOutput })
  async create(
    @Request() req,
    @Body() data: BillInput,
    @Res() response: Response,
  ) {
    const { id } = req.user;

    const output = await this.createBillUsecase.execute({
      ...data,
      ownerId: id,
    });

    return response.status(HttpStatus.CREATED).json(output);
  }
}
