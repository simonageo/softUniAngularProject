import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}
  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { email, password } = form.value;
    this.userService.login(email, password).subscribe((res) => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('userId', res['_id']);
      localStorage.setItem('username', res.username);
      this.router.navigate(['/']);
    });
  }
}
