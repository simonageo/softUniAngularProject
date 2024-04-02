import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from 'src/app/types/comment';
import { ErrorService } from '../error/error.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  URL = 'http://localhost:3030/data/comments';

  constructor(private httpClient: HttpClient, private errorService: ErrorService) { }

  getAllCommentsForItem(itemId: string){
    const query = new URLSearchParams({
      where: `itemId="${itemId}"`,
    });
    return this.httpClient.get<Comment[]>(this.URL+`?`+query).pipe(
      catchError((error)=>{
        this.errorService.setError(error);
        return throwError(()=>error)
      })
    );
  }

  addComment(itemId:string, text: string, username: string){
    const body={itemId, text, username};
    return this.httpClient.post<Comment>(this.URL, body).pipe(
      catchError((error)=>{
        this.errorService.setError(error);
        return throwError(()=>error)
      })
    )
  }

  deleteComment(id: string){
    return this.httpClient.delete(`${this.URL}/${id}`).pipe(
      catchError((error)=>{
        this.errorService.setError(error);
        return throwError(()=>error)
      })
    )
  }

}
