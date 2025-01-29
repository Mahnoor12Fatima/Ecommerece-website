import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAddCategoriesComponent } from './seller-add-categories.component';

describe('SellerAddCategoriesComponent', () => {
  let component: SellerAddCategoriesComponent;
  let fixture: ComponentFixture<SellerAddCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerAddCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerAddCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
