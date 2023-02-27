import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable , tap} from 'rxjs';

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(       

        tap(() => {
            const request = context.switchToHttp().getRequest();

            console.log(request.url)
            console.log(`After... ${Date.now() - now}ms`)
        }),
      );
  }
}