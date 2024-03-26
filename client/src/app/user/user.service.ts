import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL = 'http://localhost:3030';
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    const body = { email, password };
    return this.httpClient.post<any>(`${this.URL}/users/login`, body);
  };

  logout(){
    localStorage.removeItem('accessToken');
  }
}
