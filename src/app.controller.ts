import { PrismaService } from '@Infra/prisma';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  getHello() {
    return this.prismaService.users.findMany();
  }
}
