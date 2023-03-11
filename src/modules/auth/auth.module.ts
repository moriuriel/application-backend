import { loadEnvironmentConfig } from '@Infra/configuration';
import { BcryptAdapter } from '@Infra/cryptography';
import { UsersModule } from '@Modules/users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './application/strategies/jwt.strategy';
import { UserAuthUseCase } from './application/use-cases/user-auth.usecase';
import { AuthController } from './presentations/controllers/auth.controller';

const { jwt } = loadEnvironmentConfig();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwt.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: 'CryptographyAdapter',
      useFactory: () => {
        return new BcryptAdapter(10);
      },
    },
    UserAuthUseCase,
  ],
})
export class AuthModule {}
