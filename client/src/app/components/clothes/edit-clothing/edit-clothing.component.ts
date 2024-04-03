import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClothesService } from '../clothes.service';
import { Clothing } from 'src/app/types/clothes';
import { Subscription } from 'rxjs';
import { ErrorService } from '../../error/error.service';

@Component({
  selector: 'app-edit-clothing',
  templateUrl: './edit-clothing.component.html',
  styleUrls: ['./edit-clothing.component.css'],
})
export class EditClothingComponent implements OnInit, OnDestroy {
  itemId: string = '';
  errorMsg = '';
  clothing: Clothing | null = null;
  paramsSubscription: Subscription | null = null;
  clothingSubscription: Subscription | null = null;
  editClothingSubscription: Subscription | null = null;
  errorServiceSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private clothesService: ClothesService,
    private router: Router,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.itemId = params['id'];
    });
    this.clothingSubscription = this.clothesService
      .getOneClothing(this.itemId)
      .subscribe((data) => {
        this.clothing = data;
      });
      this.errorServiceSubscription = this.errorService.apiError$$.subscribe((err: any) => {
      if (err) {
        this.errorMsg = err.message;
      } else {
        this.errorMsg = '';
      }
    });
  }
  editItem(form: NgForm) {
    if (form.invalid) {
      console.log('invalid form');
      return;
    }
    const { title, category, imageUrl, price, description } = form.value;
    this.editClothingSubscription = this.clothesService
      .updateClothing(
        this.itemId,
        title,
        category,
        imageUrl,
        price,
        description
      )
      .subscribe((res) => {
        this.router.navigate([`/store/${this.itemId}`]);
      });
  }

  validatePrice(form: NgForm) {
    const priceControl = form.controls['price'];
    if (priceControl.value === null) {
    } else if (isNaN(priceControl.value) || priceControl.value < 0) {
      priceControl.setErrors({ invalidPrice: true });
    } else {
      priceControl.setErrors({ invalidPrice: false });
      priceControl.setErrors({ required: false });
      priceControl.setErrors(null);
    }
    priceControl.markAsTouched();
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.clothingSubscription?.unsubscribe();
    this.editClothingSubscription?.unsubscribe();
    this.errorServiceSubscription?.unsubscribe();
  }
}
