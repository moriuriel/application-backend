import { DashboardRepository } from '@Modules/dashboard/infrastructure/repository/dashboard.repository';
import {
  GetStastPresenter,
  StatsOutput,
} from '@Modules/dashboard/presentations/presenter/get-stast.presenter';
import { Injectable } from '@nestjs/common';

export type GetStastInput = {
  ownerId: string;
};

export interface IGetStastUseCase {
  execute(input: GetStastInput): Promise<StatsOutput>;
}

@Injectable()
export class GetStastUseCase implements IGetStastUseCase {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  public async execute(input: GetStastInput): Promise<StatsOutput> {
    const statsBills = await this.dashboardRepository.getBillsIsPaid(
      input.ownerId,
    );

    const mostUsedCards = await this.dashboardRepository.getMostUsedCards(
      input.ownerId,
    );

    return GetStastPresenter.output({
      amountPaid: statsBills.amountPaid,
      amountPaidLastMonth: 100,
      amountToBePaid: 500,
      cards: mostUsedCards,
      inCrescent: false,
    });
  }
}
