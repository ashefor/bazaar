import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartPreviewComponent } from '../cart-preview/cart-preview.component';

@Component({
  selector: 'app-home-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, CartPreviewComponent],
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss']
})
export class HomeNavbarComponent {

}
