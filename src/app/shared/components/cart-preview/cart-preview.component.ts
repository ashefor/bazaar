import { AfterViewInit, Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Drawer, DrawerInterface, DrawerOptions } from 'flowbite';
import { StoreService } from '@core/services/store.service';
import { CartItem } from '@core/interfaces/cart.interface';
import { ImageUrlPipe } from '@shared/pipes/image-url.pipe';

@Component({
  selector: 'app-cart-preview',
  standalone: true,
  imports: [CommonModule, RouterModule, ImageUrlPipe],
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.scss']
})
export class CartPreviewComponent implements AfterViewInit {
  @Input() cartItems: CartItem[] = [];
  @ViewChild('drawerRef') drawerRef?: ElementRef;
  private readonly service = inject(StoreService);
  cartTotal = this.service.cartTotal;
  cartPreviewToggleState = this.service.getCartToggleState$();
  cartPreviewdrawer?: DrawerInterface;
  options: DrawerOptions = {
    placement: 'right',
    backdrop: true,
    bodyScrolling: false,
    edge: false,
    edgeOffset: '',
    backdropClasses: 'bg-gray-900 bg-opacity-50 fixed inset-0 z-30',
    onShow: () => {
      this.fetchCartItems();
    },
  };
  isPerformingOperation  = false;

  ngAfterViewInit(): void {
    this.cartPreviewdrawer = new Drawer(this.drawerRef?.nativeElement, this.options);
    this.cartPreviewToggleState.subscribe(state => {
      if (state) {
        this.openDrawer();
      } else {
        this.closeDrawer();
      }
    })
  }

  openDrawer() {
    this.cartPreviewdrawer?.show()
  }

  closeDrawer() {
    this.cartPreviewdrawer?.hide()
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

  get cartTotalSum() {
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

  clearCart() {
    this.isPerformingOperation = true;
    this.service.clearCart().subscribe({
      next: () => {
        this.isPerformingOperation = false
        this.fetchCartItems()
      },
      error: () => {
        this.isPerformingOperation = false;
        this.fetchCartItems()
      }
    })
  }
}
