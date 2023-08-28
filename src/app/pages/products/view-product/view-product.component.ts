import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { StoreService } from '@core/services/store.service';
import { ProductViewSkeletonComponent } from '../components/product-view-skeleton/product-view-skeleton.component';
import { Product } from '@core/interfaces/product.interface';
import { ImageUrlPipe } from '@shared/pipes/image-url.pipe';
import { productColors, productSizes } from '@core/utils/constants';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductViewSkeletonComponent, ImageUrlPipe],
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit, OnDestroy {
  private readonly service = inject(StoreService);
  private readonly destroy$ = new Subject<boolean>();
  @Input() productId: string = '';
  isFetchingProduct = false;
  productSizes = productSizes;
  productColors = productColors;
  product?: Product


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.fetchProductDetails();
  }

  fetchProductDetails() {
    if(this.productId) {
      this.isFetchingProduct = true;
    this.service.fetchSingleProduct(this.productId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.product = data;
        console.log(data)
        this.isFetchingProduct = false;
      },
      error: () => {
        this.isFetchingProduct = false;
      }
    })
    }
  }
}
