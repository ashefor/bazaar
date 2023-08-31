import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { StoreService } from '@core/services/store.service';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { Product, ProductsData } from '@core/interfaces/product.interface';
import { ProductsListSkeletonComponent } from '../components/products-list-skeleton/products-list-skeleton.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    PaginationComponent, ProductsListSkeletonComponent, ProductCardComponent],
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnDestroy, OnInit {
  private readonly service = inject(StoreService);
  private readonly destroy$ = new Subject<boolean>();
  page = 1;
  limit = 12;
  isLoading = false;
  products: Product[] = [];
  pageSize = 12;
  pageData?: ProductsData

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.isLoading = true;
    const params = {
      page: this.page,
      limit: this.limit
    }
    this.service.fetchProducts(params).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.products = data.products;
        this.pageData = data
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
      }
    })
  }

  paginate(page: number) {
    this.page = page;
    this.fetchProducts();
  }

}
