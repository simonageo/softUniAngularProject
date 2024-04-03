import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ClothesService } from '../components/clothes/clothes.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class IsOwner implements CanActivate {
  constructor(
    private clothesService: ClothesService,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const itemId = next.paramMap.get('id') as string;

    return this.clothesService.getOneClothing(itemId).pipe(
      switchMap((res) => {
        const ownerId = res._ownerId;
        if (this.userService.isAuthenticated) {
          const userId = localStorage.getItem('userId');
          if (userId === ownerId) {
            return of(true);
          } else {
            this.router.navigate(['/']);
            return of(false);
          }
        } else {
          this.router.navigate(['/']);
          return of(false);
        }
      })
    );
  }
}
