import { JwtAuthGuard } from '@Modules/auth/application/guards/jwt-auth.guard';
import { GetStastUseCase } from '@Modules/dashboard/application/use-cases/get-stats.usecase';
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
  constructor(private readonly getStatsUseCase: GetStastUseCase) {}
  @Get('stats')
  @ApiOkResponse({ type: StatsOutput })
  async index(@Res() response: Response, @Request() req) {
    const { id } = req.user;
    const output = await this.getStatsUseCase.execute({ ownerId: id });

    return response.status(HttpStatus.OK).json(output);
  }
}
