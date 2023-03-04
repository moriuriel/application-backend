import { loadSwaggerSetup, loadEnvironmentConfig } from '@Infra/configuration';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const { port } = loadEnvironmentConfig();

  const app = await NestFactory.create(AppModule);

  loadSwaggerSetup(app);

  await app.listen(port);
}
bootstrap();
