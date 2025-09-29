
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const res: any = exception.getResponse();
    const errors = res.message || res;

    response.status(400).json({
      success: false,
      timestamp: new Date().toISOString(),
      path: request.url,
      errors,
    });
  }
}
