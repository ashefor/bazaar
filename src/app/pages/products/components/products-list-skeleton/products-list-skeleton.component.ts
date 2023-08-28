import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardSkeletonComponent } from '../product-card-skeleton/product-card-skeleton.component';

@Component({
  selector: 'app-products-list-skeleton',
  standalone: true,
  imports: [CommonModule, ProductCardSkeletonComponent],
  templateUrl: './products-list-skeleton.component.html',
  styleUrls: ['./products-list-skeleton.component.scss']
})
export class ProductsListSkeletonComponent {

}
