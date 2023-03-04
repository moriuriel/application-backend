import { PrismaService } from '@Infra/prisma';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller({ path: 'users', version: '1' })
@ApiTags('Usuários')
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}
  @Get()
  index() {
    return this.prismaService.users.findMany();
  }
}
