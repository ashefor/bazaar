import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewSkeletonComponent } from './product-view-skeleton.component';

describe('ProductViewSkeletonComponent', () => {
  let component: ProductViewSkeletonComponent;
  let fixture: ComponentFixture<ProductViewSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductViewSkeletonComponent]
    });
    fixture = TestBed.createComponent(ProductViewSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
