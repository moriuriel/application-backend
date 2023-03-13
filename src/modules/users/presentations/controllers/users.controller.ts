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
import { CreateUserDto, CreateUserOutput } from './dtos/create-user.dto';

@Controller({ path: 'users', version: '1' })
@ApiTags('Usuários')
export class UserController {
  constructor(
    private readonly createUserUsecase: CreateUserUseCase,
    private readonly findUserByIdUsecase: FindUserByIdUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateUserOutput })
  async create(@Body() body: CreateUserDto, @Res() response: Response) {
    const output = await this.createUserUsecase.execute(body);

    return response.status(HttpStatus.CREATED).json(output);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  @ApiOkResponse({ type: CreateUserOutput })
  async find(@Request() req, @Res() response: Response) {
    const { id } = req.user;

    const output = await this.findUserByIdUsecase.execute({ id });

    return response.status(HttpStatus.OK).json(output);
  }
}
