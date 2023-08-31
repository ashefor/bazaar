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
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { MetaService } from '@core/services/meta.service';

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
  private readonly metaService = inject(MetaService);
  @Input() product_slug: string = '';
  isFetchingProduct = false;
  productSizes = productSizes;
  productColors = productColors;
  product?: Product
  isAddingToCart = false;

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.fetchProductDetails();
  }

  fetchProductDetails() {
    if(this.product_slug) {
      this.isFetchingProduct = true;
    this.service.fetchSingleProduct(this.product_slug).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.product = data;
        this.isFetchingProduct = false;
        this.metaService.updateTitle(this.product?.product_name+ ' - Bazaar');
        this.metaService.updateDescription(this.product?.product_description);
      },
      error: () => {
        this.isFetchingProduct = false;
      }
    })
    }
  }

  addToCart() {
    const params = {
      id: this.product?._id,
      product: this.product,
      quantity: 1
    }
    this.isAddingToCart = true;
    this.service.getCartItem(this.product?._id!).pipe(mergeMap((cart: any) => {
      if (cart) {
        return this.service.updateCartItem({...params, quantity: Number(cart.quantity) + 1})
      } else {
        return this.service.addProductToCart(params)
      }
    }
    ))
    .subscribe({
      next: (data) => {
        this.isAddingToCart = false;
      },
      error: (e) => {
        console.log(e)
        this.isAddingToCart = false
      }
    })
  }
}
