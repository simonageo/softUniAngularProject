import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ErrorService } from '../components/error/error.service';

@Injectable()
class AuthenticatedInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}

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
      
      return next.handle(modifiedRequest).pipe(
        catchError(err=> {
          this.errorService.setError(err)
          return [err]
        })
      );
    }
    return next.handle(request).pipe(
      catchError(err=> {
        this.errorService.setError(err);
        console.log(err)
        return [err]
      })
    );;
  }
}


export const authenticatedInterceptorProvider: Provider = {
  useClass: AuthenticatedInterceptor,
  multi: true,
  provide: HTTP_INTERCEPTORS
}