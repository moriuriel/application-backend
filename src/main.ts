import { loadSwaggerSetup, loadEnvironmentConfig } from '@Infra/configuration';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const { port } = loadEnvironmentConfig();

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.enableVersioning({ type: VersioningType.URI });

  app.setGlobalPrefix('/api');
  loadSwaggerSetup(app);

  await app.listen(port);
}
bootstrap();
