import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function loadSwaggerSetup(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Minhas Contas API')
    .addBearerAuth()
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
}
