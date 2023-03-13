import { UserAuthUseCase } from '@Modules/auth/application/use-cases/user-auth.usecase';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthOutput, AuthInput } from './contracts/user-auth.contract';

@Controller({ path: 'authenticate', version: '1' })
@ApiTags('Autenticação')
export class AuthController {
  constructor(private readonly userAuthUseCase: UserAuthUseCase) {}

  @Post()
  @ApiCreatedResponse({ type: AuthOutput })
  async create(@Body() body: AuthInput, @Res() response: Response) {
    const output = await this.userAuthUseCase.execute(body);

    return response.status(HttpStatus.CREATED).json(output);
  }
}
