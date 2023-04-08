import { JwtAuthGuard } from '@Modules/auth/application/guards/jwt-auth.guard';
import { DashboardRepository } from '@Modules/dashboard/infrastructure/repository/dashboard.repository';
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
import { StatsOutput } from '../contracts/dashboard.contract';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'dashboard', version: '1' })
@ApiTags('Dashboard')
export class DashboardController {
  constructor(private readonly dashboardRepository: DashboardRepository) {}
  @Get('stats')
  @ApiOkResponse({ type: StatsOutput })
  async index(@Res() response: Response, @Request() req) {
    const { id } = req.user;
    const result = await this.dashboardRepository.getBillsIsPaid(id);
    const cards = await this.dashboardRepository.getMostUsedCards(id);
    console.log(result);
    return response.status(HttpStatus.OK).json({ result, cards });
  }
}
