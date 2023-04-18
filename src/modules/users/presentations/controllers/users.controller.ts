import { JwtAuthGuard } from '@Modules/auth/application/guards/jwt-auth.guard';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  FindUserByIdUseCase,
  UpdateUserUseCase,
} from '@Modules/users/application/use-cases';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
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
    private readonly updateUserUsecase: UpdateUserUseCase,
    private readonly deleteUserUsecase: DeleteUserUseCase,
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

  @UseGuards(JwtAuthGuard)
  @Put('/me')
  @ApiOkResponse({ type: UserOutput })
  async update(
    @Request() req,
    @Res() response: Response,
    @Body() body: UserInput,
  ) {
    const { id } = req.user;

    const output = await this.updateUserUsecase.execute({ id, ...body });

    return response.status(HttpStatus.OK).json(output);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/me')
  @ApiOkResponse({ type: UserOutput })
  async delete(@Request() req, @Res() response: Response) {
    const { id } = req.user;

    await this.deleteUserUsecase.execute({ id });

    return response.status(HttpStatus.ACCEPTED).json({});
  }
}
