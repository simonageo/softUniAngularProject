import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClothesService } from '../clothes.service';
import { Clothing } from 'src/app/types/clothes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details-clothes',
  templateUrl: './details-clothes.component.html',
  styleUrls: ['./details-clothes.component.css'],
})
export class DetailsClothesComponent implements OnInit, OnDestroy {
  itemId: string = '';
  clothing: Clothing | null = null;
  ownerId: string = '';
  userId: string = '';
  paramsSubscription: Subscription | null = null;
  clothingSubscription: Subscription | null = null;
  removeClothingSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private clothesService: ClothesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.itemId = params['id'];
    });
    this.clothingSubscription = this.clothesService
      .getOneClothing(this.itemId)
      .subscribe((data) => {
        this.clothing = data;
        this.ownerId = data['_ownerId'];
      });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  isOwner(): boolean {
    const userId = localStorage.getItem('userId');
    return userId === this.ownerId;
  }

  onDelete() {
    const confirmation = window.confirm(
      'Are you sure you want to delete this item?'
    );

    if (confirmation) {
      this.removeClothingSubscription=this.clothesService.removeClothing(this.itemId).subscribe(() => {
        this.router.navigate(['store']);
      });
    }
  }

  getItemTitle() {
    return this.clothing?.title;
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.clothingSubscription?.unsubscribe();
    this.removeClothingSubscription?.unsubscribe();
  }
}
