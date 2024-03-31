import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClothingComponent } from './edit-clothing.component';

describe('EditClothingComponent', () => {
  let component: EditClothingComponent;
  let fixture: ComponentFixture<EditClothingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditClothingComponent]
    });
    fixture = TestBed.createComponent(EditClothingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
