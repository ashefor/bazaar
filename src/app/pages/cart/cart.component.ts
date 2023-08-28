import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { StoreService } from '@core/services/store.service';
import { Product } from '@core/interfaces/product.interface';
import { CartItem } from '@core/interfaces/cart.interface';
import { ImageUrlPipe } from '@shared/pipes/image-url.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent, ImageUrlPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnDestroy, OnInit {
  private readonly service = inject(StoreService);
  private readonly destroy$ = new Subject<boolean>();
  isLoading = false;
  cartItems: CartItem[] = [];
  isPerformingOperation = false

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.fetchCartItems();
  }

  fetchCartItems() {
    this.service.getCartItems().subscribe({
      next: cart => {
        this.cartItems = cart;
      },
      error: () => {
        this.cartItems = [];
      }
    })
  }

  updatQuantity(item: CartItem, quantity: number) {
    this.isPerformingOperation = true
    this.service.updateCartItem({ ...item, quantity: quantity }).subscribe({
      next: () => {
        this.isPerformingOperation = false
      },
      error: () => {
        this.isPerformingOperation = false
      }
    })
  }

  get cartTotal() {
    return this.cartItems?.reduce((acc, item) => acc + item.quantity * item.product.product_price, 0)
  }

  deleteFromCart(item: CartItem) {
    this.isPerformingOperation = true;
    this.service.deleteFromCart(item.id).subscribe({
      next: () => {
        this.isPerformingOperation = false;
        this.fetchCartItems()
      },
      error: () => {
        this.isPerformingOperation = false;
        this.fetchCartItems()
      }
    })
  }
}
