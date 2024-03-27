import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}
  register(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { email, password, rePassword } = form.value;
    if (password === rePassword) {
      this.userService
        .register(email, password)
        .subscribe((res) => {
          //localStorage.setItem('accessToken', res.accessToken);
          this.router.navigate(['/']);
        });
    } else {
      console.log(password);
      console.log(rePassword);
    }
  }
}
