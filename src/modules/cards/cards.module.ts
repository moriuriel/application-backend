import { PrismaService } from '@Infra/prisma';
import { Module } from '@nestjs/common';
import { CreateCardUseCase } from './application/use-cases/create-card.usecase';
import { FindCardByOwnerUseCase } from './application/use-cases/find-card-by-owner.useecase';
import { CardRepository } from './infrastructure/repositories/card.repository';
import { CardOwnerController } from './presentations/controllers/card-owner.controller';
import { CardController } from './presentations/controllers/card.controller';

@Module({
  controllers: [CardController, CardOwnerController],
  providers: [
    PrismaService,
    CardRepository,
    CreateCardUseCase,
    FindCardByOwnerUseCase,
  ],
})
export class CardsModule {}
