import { PrismaService } from '@Infra/prisma';
import { Module } from '@nestjs/common';
import { CardRepository } from './infrastructure/repositories/card.repository';
import { CardControlloer } from './presentations/controllers/card.controller';

@Module({
  controllers: [CardControlloer],
  providers: [PrismaService, CardRepository],
})
export class CardsModule {}
