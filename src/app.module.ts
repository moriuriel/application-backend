import { AuthModule } from '@Modules/auth/auth.module';
import { UsersModule } from '@Modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UsersModule],
})
export class AppModule {}
