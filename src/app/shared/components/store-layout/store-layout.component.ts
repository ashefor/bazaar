import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { storage } from '@core/utils/storage/storage';
import { AuthService } from '@core/services/auth.service';
import { StoreService } from '@core/services/store.service';
import { CartItem } from '@core/interfaces/cart.interface';

@Component({
  selector: 'app-store-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeNavbarComponent, FooterComponent],
  templateUrl: './store-layout.component.html',
  styleUrls: ['./store-layout.component.scss']
})
export class StoreLayoutComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly service = inject(StoreService);
  cartItems: CartItem[] = [];

  ngOnInit(): void {
    this.fetchCartItems();
    const expiryDate = storage.getItem('expiryDate');
    if (new Date(expiryDate * 1000) <= new Date()) {
      // this.logoutHandler();
      return;
    }
    const remainingMilliseconds = new Date(expiryDate * 1000).getTime() - new Date().getTime();
    this.setAutoLogout(remainingMilliseconds);
  }

  logoutHandler() {
    this.auth.clearSession();
  }

  fetchCartItems() {
    console.log('cart')
    this.service.getCartItems().subscribe({
      next: cart => {
        // console.log(cart.reduce((acc, item) => acc + Number(item.quantity), 0))
        this.cartItems = cart;
        console.log(cart);
      },
      error: () => {
        this.cartItems = [];
      }
    })
  }


  setAutoLogout(milliseconds: number) {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };
}
