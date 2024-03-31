import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClothesService } from '../clothes.service';
import { Clothing } from 'src/app/types/clothes';

@Component({
  selector: 'app-details-clothes',
  templateUrl: './details-clothes.component.html',
  styleUrls: ['./details-clothes.component.css'],
})
export class DetailsClothesComponent implements OnInit {
  itemId: string = '';
  clothing: Clothing | null = null;
  ownerId: string ='';
  constructor(
    private route: ActivatedRoute,
    private clothesService: ClothesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
    });
    this.clothesService.getOneClothing(this.itemId).subscribe(
      (data) => {
        this.clothing = data;
        this.ownerId=data['_ownerId'];
      }
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  };

  isOwner(): boolean {
    const userId=localStorage.getItem('userId');
    return userId===this.ownerId;
  }
}
