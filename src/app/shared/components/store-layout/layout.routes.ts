import { Routes } from "@angular/router";
import { StoreLayoutComponent } from "./store-layout.component";

export const routes: Routes = [
  {
    path: '',
    component: StoreLayoutComponent,
    children: [
      {
        path: 'products',
        loadChildren: () => import('@pages/products/products.routes').then(m => m.routes)
      },
      {
        path: 'faqs',
        loadComponent: () => import('@pages/faqs/faqs.component').then(m => m.FaqsComponent)
      },
      {
        path: 'checkout',
        loadComponent: () => import('@pages/checkout/checkout.component').then(m => m.CheckoutComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('@pages/cart/cart.component').then(m => m.CartComponent)
      },
      {
        path: '',
        loadComponent: () => import('@pages/home/home.component').then(m => m.HomeComponent)
      }
    ]
  }
]
