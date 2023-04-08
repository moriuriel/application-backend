import { PrismaService } from '@Infra/prisma';
import { Module } from '@nestjs/common';
import { DashboardRepository } from './infrastructure/repository/dashboard.repository';
import { DashboardController } from './presentations/controllers/dashboard.controller';

@Module({
  controllers: [DashboardController],
  providers: [PrismaService, DashboardRepository],
})
export class DashboardModule {}
