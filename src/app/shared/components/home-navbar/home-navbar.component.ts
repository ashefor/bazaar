import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartPreviewComponent } from '../cart-preview/cart-preview.component';
import { AuthService } from '@core/services/auth.service';
import { storage } from '@core/utils/storage/storage';
import { Drawer } from 'flowbite';


@Component({
  selector: 'app-home-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, CartPreviewComponent],
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss']
})
export class HomeNavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('drawerRef') drawerRef?: ElementRef;
  private readonly router = inject(Router);
  public readonly auth = inject(AuthService);
  user = storage.getUser();
  drawer?: Drawer

  ngOnInit(): void {
    // this.fetchCartItems();
  }

  ngAfterViewInit(): void {
    this.drawer = new Drawer(this.drawerRef?.nativeElement, {
      placement: 'left'
    })
  }

  openDrawer() {
    this.drawer?.show()
  }

  closeDrawer() {
    this.drawer?.hide()
  }


  get hideMenu(): boolean {
    return this.router.url.includes('checkout') || this.router.url.includes('cart');
  }

  logOut() {
    this.auth.clearSession();
    this.closeDrawer();
    this.router.navigate(['/']);
  }
}
