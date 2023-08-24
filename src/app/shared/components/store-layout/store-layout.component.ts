import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-store-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeNavbarComponent, FooterComponent],
  templateUrl: './store-layout.component.html',
  styleUrls: ['./store-layout.component.scss']
})
export class StoreLayoutComponent {

}
