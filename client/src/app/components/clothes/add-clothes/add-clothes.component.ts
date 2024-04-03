import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClothesService } from '../clothes.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../error/error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-clothes',
  templateUrl: './add-clothes.component.html',
  styleUrls: ['./add-clothes.component.css'],
})
export class AddClothesComponent implements OnInit, OnDestroy {
  errorMsg = '';
  errorServiceSubscription: Subscription | null = null;
  addItemServiceSubscription: Subscription | null = null;


  constructor(
    private clothesService: ClothesService,
    private router: Router,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.errorServiceSubscription = this.errorService.apiError$$.subscribe((err: any) => {
      if (err) {
        this.errorMsg = err.message;
      } else {
        this.errorMsg = '';
      }
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

  addItem(form: NgForm) {
    if (form.invalid) {
      console.log('invalid form');
      return;
    }
    const { title, category, imageUrl, price, description } = form.value;
    this.addItemServiceSubscription = this.clothesService
      .addClothing(title, category, imageUrl, price, description)
      .subscribe((res) => {
        this.router.navigate(['/store']);
      });
  }

  ngOnDestroy(): void {
    this.errorServiceSubscription?.unsubscribe();
    this.addItemServiceSubscription?.unsubscribe();
  }
}
