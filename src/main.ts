import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const documentBuilder = new DocumentBuilder()
    .setTitle('Challenge Bank Transaction')
    .setDescription('Challenge Bank Transaction')
    .setVersion('1.0')
    .addTag('Challenge Bank Transaction')
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('docs', app, document);


  
  await app.listen(process.env.PORT ?? 3001);

}
bootstrap();
