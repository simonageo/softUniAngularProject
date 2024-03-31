import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-clothing',
  templateUrl: './edit-clothing.component.html',
  styleUrls: ['./edit-clothing.component.css']
})
export class EditClothingComponent {
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
}
