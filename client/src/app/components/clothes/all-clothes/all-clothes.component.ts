import { Component, OnInit } from '@angular/core';
import { Clothing } from 'src/app/types/clothes';
import { ClothesService } from '../clothes.service';

@Component({
  selector: 'app-all-clothes',
  templateUrl: './all-clothes.component.html',
  styleUrls: ['./all-clothes.component.css'],
})
export class AllClothesComponent implements OnInit {
  clothes: Clothing[] | null = [];
  constructor(private clothesService: ClothesService) {}
  ngOnInit(): void {
    this.clothesService
      .getAllClothes()
      .subscribe((data: Clothing[]) => {this.clothes = data});
  }
}
