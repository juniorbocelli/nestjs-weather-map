import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
//
import { AppModule } from 'src/app.module';
import { AllExceptionFilter } from 'src/infrastructure/common/filter/exception.filter';
import { LoggingInterceptor } from 'src/infrastructure/common/interceptors/logger.interceptor';
import { ResponseFormat, ResponseInterceptor } from 'src/infrastructure/common/interceptors/response.interceptor';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { getEnvironmentFile, getEnvironmentExecution } from 'src/infrastructure/common/utils/environment.util';

async function bootstrap() {
  const env = getEnvironmentExecution();

  if (env === 'local') {
    dotenv.config({ path: getEnvironmentFile() });
  };

  // TODO: attempt to create a module to inject this configurations
  const origin = `${process.env.CORS_ORIGIN_URL}:${process.env.CORS_ORIGIN_PORT}`
  const app = await NestFactory.create(AppModule, { cors: { credentials: true, origin: origin } });

  app.use(cookieParser());

  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  // base routing
  app.setGlobalPrefix('api_v1');

  // swagger config
  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('NestJS Weather Map')
      .setDescription('Arbitralis case')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(5000);
}
bootstrap();
