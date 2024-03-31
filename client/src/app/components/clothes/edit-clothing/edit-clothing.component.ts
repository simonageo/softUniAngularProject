import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClothesService } from '../clothes.service';
import { Clothing } from 'src/app/types/clothes';

@Component({
  selector: 'app-edit-clothing',
  templateUrl: './edit-clothing.component.html',
  styleUrls: ['./edit-clothing.component.css']
})
export class EditClothingComponent implements OnInit{
  itemId: string = '';
  clothing: Clothing | null = null;

  constructor (private route: ActivatedRoute, private clothesService: ClothesService){}

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.itemId=params['id']
    });
    this.clothesService.getOneClothing(this.itemId).subscribe(data=>{
      this.clothing=data;
    })
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
}
