import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import AppError from 'shared/models/AppError';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof AppError
        ? exception.statusCode
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof AppError
        ? exception.message
        : 'Ocorreu um erro interno. Tente novamente mais tarde';

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
