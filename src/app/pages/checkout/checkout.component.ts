import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { StoreService } from '@core/services/store.service';
import { CartItem } from '@core/interfaces/cart.interface';
import { ImageUrlPipe } from '@shared/pipes/image-url.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ImageUrlPipe, PageHeaderComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  private readonly service = inject(StoreService);
  delivery = 'standard'
  cartItems: CartItem[] = [];
  deliveryFee = 5000;
  checkOutForm = inject(NonNullableFormBuilder).group({
    address: ['', Validators.required],
    phone: ['', Validators.required],
    first_name: ['', Validators.required],
    last_name: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
  })

  isLoading = false;
  isFetchingCheckout = false;

  ngOnInit(): void {
    this.fetchCartItems();
  }

  fetchCartItems() {
    this.isFetchingCheckout = true;
    this.service.getCartItems().subscribe({
      next: cart => {
        this.cartItems = cart;
        this.isFetchingCheckout = false;
      },
      error: () => {
        this.cartItems = [];
        this.isFetchingCheckout = false;
      }
    })
  }

  get cartTotalSum() {
    return this.cartItems?.reduce((acc, item) => acc + item.quantity * item.product.product_price, 0)
  }

  setDeliveryFee(delivery: 'standard' | 'express') {
    if (delivery == 'standard') {
      this.deliveryFee = 5000
    } else {
      this.deliveryFee = 16000
    }
  }

  get formControls() {
    return this.checkOutForm.controls
  }

  handleCreateOrder() {
    if (this.checkOutForm.valid) {
      const params = {
        shipping: {
          ...this.checkOutForm.value,
        delivery: this.deliveryFee,
        delivery_type: this.delivery,
        total: this.cartTotalSum + this.deliveryFee + 5000
        },
        items: this.cartItems,
        // user: this.user
      }
      this.isLoading = true;
      this.service.createOrder(params).subscribe({
        next: (data) => {
          console.log(data)
          window.location.href = data.data.authorization_url
          // this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      })
    } else {
      Object.values(this.checkOutForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      })
    }
  }
}
