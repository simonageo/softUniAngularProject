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
  clothesRows: Clothing[][] = [];

  constructor(private clothesService: ClothesService) {}

  ngOnInit(): void {
    this.clothesService.getAllClothes().subscribe((data: Clothing[]) => {
      this.clothes = data;
      this.organizeClothesIntoRows();
    });
  }

  organizeClothesIntoRows(): void {
    const itemsPerRow = 3;
    let currentRow: Clothing[] = [];

    this.clothes?.forEach((item, index) => {
      currentRow.push(item);
      if ((index + 1) % itemsPerRow === 0 || index === this.clothes!.length - 1) {
        this.clothesRows.push(currentRow);
        currentRow = [];
      }
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
