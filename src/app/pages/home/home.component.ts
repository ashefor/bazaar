import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { images } from './images';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  all_categores = [
    {
      value: 'all',
      label: 'all categories'
    },
    {
      value: 'clothing',
      label: 'clothing'
    },
    {
      value: 'shoes',
      label: 'shoes'
    },
    {
      value: 'accessories',
      label: 'accessories'
    },
    {
      value: 'electronics',
      label: 'electronics'
    }
  ]
  category = 'all'

  images = images;

  changeImagesArray(category: string) {
    this.images = images.filter(image => image.category == category)
  }
}
