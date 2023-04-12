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
    const billsPaidInCurrentMonth =
      await this.dashboardRepository.getBillsCurrentMonth(input.ownerId, true);

    const billsPaidInLastMonth =
      await this.dashboardRepository.getBillsIsPaidInLastMonth(input.ownerId);

    const billsNotPaidInCurrentMonth =
      await this.dashboardRepository.getBillsCurrentMonth(input.ownerId, false);

    const mostUsedCards = await this.dashboardRepository.getMostUsedCards(
      input.ownerId,
    );

    const billTotalPaid = mostUsedCards.reduce(
      (sum, current) => sum + current.total,
      0,
    );

    return GetStastPresenter.output({
      amountPaid: billsPaidInCurrentMonth.amountPaid,
      amountPaidLastMonth: billsPaidInLastMonth.amountPaidInLastMonth,
      amountToBePaid: billsNotPaidInCurrentMonth.amountPaid,
      cards: mostUsedCards,
      inCrescent:
        billsPaidInCurrentMonth.amountPaid >
        billsPaidInLastMonth.amountPaidInLastMonth,
      totalPaid: billTotalPaid,
    });
  }
}
