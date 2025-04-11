import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { I18nService } from './i18n.service';

@Injectable()
export class LanguageInterceptor implements NestInterceptor {
  constructor(private i18nService: I18nService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const acceptLanguage = request.headers['accept-language'];

    const language = acceptLanguage?.startsWith('es') ? 'es' : 'en';
    this.i18nService.setLanguage(language);

    return next.handle();
  }
}
