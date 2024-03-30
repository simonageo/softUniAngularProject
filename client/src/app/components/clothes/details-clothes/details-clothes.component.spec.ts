import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsClothesComponent } from './details-clothes.component';

describe('DetailsClothesComponent', () => {
  let component: DetailsClothesComponent;
  let fixture: ComponentFixture<DetailsClothesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsClothesComponent]
    });
    fixture = TestBed.createComponent(DetailsClothesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
