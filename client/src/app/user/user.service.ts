import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/user';
import { BehaviorSubject, Subscription, catchError, throwError } from 'rxjs';
import { ErrorService } from '../components/error/error.service';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  URL = 'http://localhost:3030';
  user: User | undefined;
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  userSubscription: Subscription;

  get isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  constructor(private httpClient: HttpClient, private errorService: ErrorService) {
    this.userSubscription = this.user$.subscribe((user) => (this.user = user));
  }

  login(email: string, password: string) {
    const body = { email, password };
    return this.httpClient.post<User>(`${this.URL}/users/login`, body).pipe(
      catchError((error)=>{
        this.errorService.setError(error);
        return throwError(()=>error)
      })
    );
  }

  register(email: string, username: string, password: string) {
    const body = { email, username, password };
    return this.httpClient.post<User>(`${this.URL}/users/register`, body).pipe(
      catchError((error)=>{
        this.errorService.setError(error);
        return throwError(()=>error)
      })
    );
  }

  logout() {
    return this.httpClient.get<User>(`${this.URL}/users/logout`).pipe(
      catchError((error)=>{
        this.errorService.setError(error);
        return throwError(()=>error)
      })
    );
  }

  getUser$() {
    return this.user$;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
