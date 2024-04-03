import { Component, OnDestroy, OnInit } from '@angular/core';
import { Clothing } from 'src/app/types/clothes';
import { ClothesService } from '../clothes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-clothes',
  templateUrl: './all-clothes.component.html',
  styleUrls: ['./all-clothes.component.css'],
})
export class AllClothesComponent implements OnInit, OnDestroy {
  clothes: Clothing[] | null = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  clothingSubscription: Subscription | null = null;

  constructor(private clothesService: ClothesService) {}

  ngOnInit(): void {
    this.clothingSubscription = this.clothesService
      .getAllClothes()
      .subscribe((data: Clothing[]) => {
        this.clothes = data;
      });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getRange(): { start: number, end: number } {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage - 1, (this.clothes?.length || 0) - 1);
    return { start: startIndex, end: endIndex };
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  getPaginationArray(): number[] {
    const pageCount = Math.ceil((this.clothes?.length || 0) / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  ngOnDestroy(): void {
    this.clothingSubscription?.unsubscribe();
  }
}
