import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-clothes',
  templateUrl: './add-clothes.component.html',
  styleUrls: ['./add-clothes.component.css']
})
export class AddClothesComponent {
  constructor( ){}
  validatePrice(form: NgForm) {
    const priceControl = form.controls['price'];
    if(priceControl.value===null){
      priceControl.setErrors({ 'required': true });
    } else if (isNaN(priceControl.value) || priceControl.value < 0) {
      priceControl.setErrors({ 'invalidPrice': true });
    } else {
      priceControl.setErrors({ 'invalidPrice': false });
      priceControl.setErrors({ 'required': false });
    }
    priceControl.markAsTouched();
  }
  
}
