import { HashComparer } from '@Data/protocols/cryptography';
import { loadEnvironmentConfig } from '@Infra/configuration';
import { UserRepository } from '@Modules/users/infrastructure/repositories/user.repository';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type UserAuthInput = {
  email: string;
  password: string;
};

export interface IUserAuthUseCase {
  execute(input: UserAuthInput): Promise<unknown>;
}

const { jwt } = loadEnvironmentConfig();

@Injectable()
export class UserAuthUseCase implements IUserAuthUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject('CryptographyAdapter') private readonly hashComparer: HashComparer,
  ) {}

  async execute(input: UserAuthInput): Promise<unknown> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new UnauthorizedException('invalid email/password');
    }

    const isPasswordValid = this.hashComparer.compare(
      input.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('invalid email/password');
    }

    const payload = { sub: user.id };

    return {
      token: this.jwtService.sign(payload, { secret: jwt.secret }),
    };
  }
}
