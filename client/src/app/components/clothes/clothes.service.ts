import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clothing } from 'src/app/types/clothes';

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

  getAllClothes(){
    return this.httpClient.get<Clothing[]>(this.URL);
  };

  getOneClothing(id:String){
    return this.httpClient.get<Clothing>(this.URL+'/'+id)
  }
}
