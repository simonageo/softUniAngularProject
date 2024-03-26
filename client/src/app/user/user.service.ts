import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL = 'http://localhost:3030';
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    const body = { email, password };
    return this.httpClient.post<User>(`${this.URL}/users/login`, body);
  };

  register(email: string, password: string){
    const body = {email, password};
    return this.httpClient.post<User>(`${this.URL}/users/register`, body);
  }

  logout(){
    localStorage.removeItem('accessToken');
  }
}
