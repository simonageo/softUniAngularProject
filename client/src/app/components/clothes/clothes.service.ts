import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clothing } from 'src/app/types/clothes';
import { ErrorService } from '../error/error.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClothesService {
  URL = 'http://localhost:3030/data/clothes';
  clothes: Clothing | undefined;

  constructor(private httpClient: HttpClient, private errorService: ErrorService, private router: Router) {}

  addClothing(
    title: string,
    category: string,
    imageUrl: string,
    price: number,
    description: string
  ) {
    const body = { title, category, imageUrl, price, description };
    return this.httpClient.post<Clothing>(this.URL, body).pipe(
      catchError((error)=>{
        this.errorService.setError(error);
        return throwError(()=>error)
      })
    );
  }

  getAllClothes() {
    return this.httpClient.get<Clothing[]>(this.URL).pipe(
      catchError((error)=>{
        this.errorService.setError(error);
        return throwError(()=>error)
      })
    );
  }

  getOneClothing(id: String) {
    return this.httpClient.get<Clothing>(this.URL + '/' + id).pipe(
      catchError((error)=>{
        this.errorService.setError(error);
        return throwError(()=>error)
      })
    );
  }

  updateClothing(
    id: string,
    title: string,
    category: string,
    imageUrl: string,
    price: number,
    description: string
  ) {
    const body = { title, category, imageUrl, price, description };
    return this.httpClient.put<Clothing>(this.URL + '/' + id, body).pipe(
      catchError((error)=>{
        this.errorService.setError(error);
        return throwError(()=>error)
      })
    );
  }

  removeClothing(id: string) {
    return this.httpClient.delete<Clothing>(this.URL + '/' + id).pipe(
      catchError((error)=>{
        this.errorService.setError(error);
        return throwError(()=>error)
      })
    );
  }
}
