import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { ErrorService } from '../error/error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMsg = '';
  errorSubscription: Subscription | null = null;
  loginSubscription: Subscription | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private errorService: ErrorService
  ) {}
  ngOnInit(): void {
    this.errorSubscription = this.errorService.apiError$$.subscribe((err: any) => {
      if (err) {
        if (err.status === 403) {
          this.errorMsg = "Invalid email or password!";
        } else {
          this.errorMsg = err.message;
        }
      } else {
        this.errorMsg = '';
      }
    });
  }

  login(form: NgForm) {
    if (form.invalid) {
      console.log('Form invalid')
      return;
    }
    const { email, password } = form.value;
    this.loginSubscription = this.userService.login(email, password).subscribe((res) => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('userId', res['_id']);
      localStorage.setItem('username', res.username);
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription?.unsubscribe();
    this.loginSubscription?.unsubscribe();
  }
}
