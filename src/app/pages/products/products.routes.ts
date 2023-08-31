import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: ':product_slug',
    loadComponent: () => import('@pages/products/view-product/view-product.component').then(m => m.ViewProductComponent),
    data: {
      title: 'Product - Bazaar',
      description: 'Explore the details of our amazing product'
    }
  },
  {
    path: '',
    loadComponent: () => import('@pages/products/list-products/list-products.component').then(m => m.ListProductsComponent),
    data: {
      title: 'Products - Bazaar',
      description: 'View all our amazing products'
    }
  }
]
