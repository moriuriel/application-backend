import { JwtAuthGuard } from '@Modules/auth/application/guards/jwt-auth.guard';
import { CreateUserUseCase } from '@Modules/users/application/use-cases';
import { FindUserByIdUseCase } from '@Modules/users/application/use-cases/find-user-by-id.usecase';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Response as Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserInput, UserOutput } from '../contracts/user.contract';

@Controller({ path: 'users', version: '1' })
@ApiTags('Usuários')
export class UserController {
  constructor(
    private readonly createUserUsecase: CreateUserUseCase,
    private readonly findUserByIdUsecase: FindUserByIdUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: UserOutput })
  async create(@Body() body: UserInput, @Res() response: Response) {
    const output = await this.createUserUsecase.execute(body);

    return response.status(HttpStatus.CREATED).json(output);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  @ApiOkResponse({ type: UserOutput })
  async find(@Request() req, @Res() response: Response) {
    const { id } = req.user;

    const output = await this.findUserByIdUsecase.execute({ id });

    return response.status(HttpStatus.OK).json(output);
  }
}
