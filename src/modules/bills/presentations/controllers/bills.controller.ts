import { JwtAuthGuard } from '@Modules/auth/application/guards/jwt-auth.guard';
import { CreateBillUsecase } from '@Modules/bills/application/use-cases/create-bill.usecase';
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
import { BillInput, BillOutput } from '../contracts/bill.contract';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'bills', version: '1' })
@ApiTags('Contas')
export class BillsController {
  constructor(private readonly createBillUsecase: CreateBillUsecase) {}

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
