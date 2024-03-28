import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clothing } from 'src/app/types/clothing';

@Injectable({
  providedIn: 'root'
})
export class ClothesService {
  URL = 'http://localhost:3030/data/clothes';
  clothes: Clothing | undefined;

  constructor(private httpClient: HttpClient) { }

  addClothing(
    title: string,
    category: string,
    imageUrl: string,
    price: number,
    description: string
  ) {
    const body = {title, category, imageUrl, price, description}
    return this.httpClient.post<Clothing>(this.URL, body)
  }
}
