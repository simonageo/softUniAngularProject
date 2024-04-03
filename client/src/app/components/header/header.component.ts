import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  logoutSubscription: Subscription | null = null;
  constructor(private userService: UserService, private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  logout() {
    this.logoutSubscription = this.userService.logout().subscribe(()=>{
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      this.router.navigate(['/'])
    });
  }

  ngOnDestroy(): void {
    this.logoutSubscription?.unsubscribe();
  }
}
