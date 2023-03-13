import { Module } from '@nestjs/common';
import { CardControlloer } from './presentations/controllers/card.controller';

@Module({ controllers: [CardControlloer] })
export class CardsModule {}
