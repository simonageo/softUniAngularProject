import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  URL = 'http://localhost:3030/data/comments';

  constructor(private httpClient: HttpClient) { }

  addComment(itemId:string, text: string, username: string){
    const body={itemId, text, username};
    return this.httpClient.post<Comment>(this.URL, body)
  }
}
