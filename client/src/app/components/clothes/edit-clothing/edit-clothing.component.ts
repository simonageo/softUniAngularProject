import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClothesService } from '../clothes.service';
import { Clothing } from 'src/app/types/clothes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-clothing',
  templateUrl: './edit-clothing.component.html',
  styleUrls: ['./edit-clothing.component.css']
})
export class EditClothingComponent implements OnInit, OnDestroy{
  itemId: string = '';
  clothing: Clothing | null = null;
  paramsSubscription: Subscription | null = null;
  clothingSubscription: Subscription | null = null;

  constructor (private route: ActivatedRoute, private clothesService: ClothesService){}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.itemId = params['id'];
    });
    this.clothingSubscription = this.clothesService.getOneClothing(this.itemId).subscribe(data => {
      this.clothing = data;
    });
  }
  editItem(form: NgForm){
    //
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
  }
}
