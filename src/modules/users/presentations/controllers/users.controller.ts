import { JwtAuthGuard } from '@Modules/auth/application/guards/jwt-auth.guard';
import { CreateUserUseCase } from '@Modules/users/application/use-cases';
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
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto, CreateUserOutput } from './dtos/create-user.dto';

@Controller({ path: 'users', version: '1' })
@ApiTags('Usuários')
export class UserController {
  constructor(private readonly createUserUsecase: CreateUserUseCase) {}
  @Post()
  @ApiCreatedResponse({ type: CreateUserOutput })
  async create(@Body() body: CreateUserDto, @Res() response: Response) {
    const output = await this.createUserUsecase.execute(body);

    return response.status(HttpStatus.CREATED).json(output);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile(@Request() req) {
    return req.user;
  }
}
