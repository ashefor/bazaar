import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: ':productId',
    loadComponent: () => import('@pages/products/view-product/view-product.component').then(m => m.ViewProductComponent)
  },
  {
    path: '',
    loadComponent: () => import('@pages/products/list-products/list-products.component').then(m => m.ListProductsComponent)
  }
]
