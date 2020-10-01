import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './shared/infra/filters/all-exceptions.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT || 3333);
}
bootstrap();
