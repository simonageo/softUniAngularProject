import { Component, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ClothesService } from '../clothes/clothes.service';
import { Clothing } from 'src/app/types/clothes';
import { Comment } from 'src/app/types/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  itemsId: string = '';
  paramsSubscription: Subscription | null = null;
  clothesSubscription: Subscription | null = null;
  commentsSubscription: Subscription | null = null;
  item: Clothing | null = null;
  comments: Comment[] | null = [];

  constructor(
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    private clothesService: ClothesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.itemsId = params['id'];
    });
    this.clothesSubscription = this.clothesService
      .getOneClothing(this.itemsId)
      .subscribe((req) => {
        this.item = req;
      });
    this.commentsSubscription = this.commentsService
      .getAllCommentsForItem(this.itemsId)
      .subscribe((data: Comment[]) => {
        this.comments = data;
      });
  }

  addComment(form: NgForm) {
    if (form.invalid) {
      console.log('Form invalid');
      return;
    }
    const { comment } = form.value;
    const username = localStorage.getItem('username');
    if (!!username) {
      this.commentsService
        .addComment(this.itemsId, comment, username)
        .subscribe((res) => {
          console.log(res);
        });
    }
  };

  isLoggedIn(){
    return !!localStorage.getItem('accessToken');
  }
}
