import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { StoreService } from '@core/services/store.service';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { Product } from '@core/interfaces/product.interface';
import { ProductsListSkeletonComponent } from '../components/products-list-skeleton/products-list-skeleton.component';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, ProductsListSkeletonComponent, ProductCardComponent],
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnDestroy, OnInit {
  private readonly service = inject(StoreService);
  private readonly destroy$ = new Subject<boolean>();
  isLoading = false;
  products: Product[] = [];

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.isLoading = true;
    this.service.fetchProducts().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        console.log(data)
        this.products = data.products;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    })
  }

}
