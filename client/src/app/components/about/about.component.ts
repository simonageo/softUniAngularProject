import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnDestroy {
  URL = 'http://localhost:3030/data/messages';
  messageSubscription: Subscription | null = null;
  constructor (private httpClient: HttpClient, private router: Router){}

  sendMessage(form: NgForm){
    if(form.invalid){
      console.log('FOrm invalid')
      return;
    }
    const {email, message} = form.value;
    this.messageSubscription = this.httpClient.post(this.URL, {email, message}).subscribe (res=>{
      this.router.navigate(['/'])
    })
  }

  get isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  ngOnDestroy(): void {
    this.messageSubscription?.unsubscribe();
  }
}
