import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../components/error/error.service';

@Injectable()
export class AuthenticatedInterceptor implements HttpInterceptor {
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
        catchError((err) => {
          this.errorService.setError(err);
          return [err];
        })
      );
    }

    return next.handle(request).pipe(
      catchError((err) => {
        this.errorService.setError(err);
        console.log(err);
        return [err];
      })
    );
  }
}