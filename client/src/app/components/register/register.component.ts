import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { ErrorService } from '../error/error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  errorMsg = '';
  registerSubscription: Subscription | null = null;
  errorSubscription: Subscription | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.errorSubscription = this.errorService.apiError$$.subscribe((err: any) => {
      if (err) {
        this.errorMsg = err.message;
      } else {
        this.errorMsg = '';
      }
    });
  }

  register(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { email, username, password, rePassword } = form.value;
    if (password === rePassword) {
      this.registerSubscription = this.userService.register(email, username, password).subscribe((res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('userId', res['_id']);
        localStorage.setItem('username', res.username);
        this.router.navigate(['/']);
      });
    }
  }

  ngOnDestroy(): void {
    this.errorSubscription?.unsubscribe();
    this.registerSubscription?.unsubscribe();
  }
}
