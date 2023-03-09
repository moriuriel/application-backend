import { PrismaService } from '@Infra/prisma';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Response as Res,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto, CreateUserOutput } from './dtos/create-user.dto';

@Controller({ path: 'users', version: '1' })
@ApiTags('Usuários')
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}
  @Post()
  @ApiCreatedResponse({ type: CreateUserOutput })
  create(@Body() body: CreateUserDto, @Res() response: Response) {
    return response.status(HttpStatus.CREATED).json(body);
  }
}
