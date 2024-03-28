import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClothesService } from '../clothes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-clothes',
  templateUrl: './add-clothes.component.html',
  styleUrls: ['./add-clothes.component.css']
})
export class AddClothesComponent {
  constructor(private clothesService: ClothesService, private router: Router){}
  validatePrice(form: NgForm) {
    const priceControl = form.controls['price'];
    if(priceControl.value===null){
      priceControl.setErrors({ 'required': true });
    } else if (isNaN(priceControl.value) || priceControl.value < 0) {
      priceControl.setErrors({ 'invalidPrice': true });
    } else {
      priceControl.setErrors(null);
    }
    priceControl.markAsTouched();
  }
  
  addItem(form: NgForm){
    if (form.invalid) {
      console.log('invalid form')
      return;
    }
    const {title, category, imageUrl, price, description}=form.value;
    this.clothesService.addClothing(title, category, imageUrl, price, description).subscribe((res)=>{
      this.router.navigate(['/'])
    })
  }
}
