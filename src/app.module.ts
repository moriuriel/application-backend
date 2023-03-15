import { AuthModule } from '@Modules/auth/auth.module';
import { CardsModule } from '@Modules/cards/cards.module';
import { CategoriesModule } from '@Modules/categories/categories.module';
import { UsersModule } from '@Modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CardsModule,
    CategoriesModule,
    UsersModule,
  ],
})
export class AppModule {}
