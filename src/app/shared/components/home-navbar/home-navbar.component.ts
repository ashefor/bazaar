import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartPreviewComponent } from '../cart-preview/cart-preview.component';
import { AuthService } from '@core/services/auth.service';
import { storage } from '@core/utils/storage/storage';
import { StoreService } from '@core/services/store.service';
import { CartItem } from '@core/interfaces/cart.interface';

@Component({
  selector: 'app-home-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, CartPreviewComponent],
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss']
})
export class HomeNavbarComponent implements OnInit {
  private readonly router = inject(Router);
  public readonly auth = inject(AuthService);
  private readonly service = inject(StoreService);
  user = storage.getUser();

  ngOnInit(): void {
    // this.fetchCartItems();
  }

  // hideMenu(menu: string): boolean {
  //   return this.router.url.includes(menu) ?? false;
  // }

  get hideMenu(): boolean {
    return this.router.url.includes('checkout') || this.router.url.includes('cart');
  }
}
