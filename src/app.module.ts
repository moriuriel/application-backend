import { AuthModule } from '@Modules/auth/auth.module';
import { BillsModule } from '@Modules/bills/bills.module';
import { CardsModule } from '@Modules/cards/cards.module';
import { CategoriesModule } from '@Modules/categories/categories.module';
import { DashboardModule } from '@Modules/dashboard/dashboard.module';
import { UsersModule } from '@Modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CardsModule,
    CategoriesModule,
    DashboardModule,
    UsersModule,
    BillsModule,
  ],
})
export class AppModule {}
