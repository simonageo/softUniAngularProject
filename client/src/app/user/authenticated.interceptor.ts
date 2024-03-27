import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
class AuthenticatedInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const modifiedRequest = request.clone({
        setHeaders: {
          'x-authorization': accessToken,
        },
      });
      
      return next.handle(modifiedRequest);
    }
    return next.handle(request);
  }
}


export const authenticatedInterceptorProvider: Provider = {
  useClass: AuthenticatedInterceptor,
  multi: true,
  provide: HTTP_INTERCEPTORS
}