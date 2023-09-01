import { Routes } from "@angular/router";
import { StoreLayoutComponent } from "./store-layout.component";
import { authGuard } from "@core/guards/auth.guard";

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
        loadComponent: () => import('@pages/faqs/faqs.component').then(m => m.FaqsComponent),
        data: {
          title: 'FAQs - Bazaar',
          description: 'Frequently asked questions about bazaar'
        }
      },
      {
        path: 'checkout',
        canMatch: [authGuard({requiresAuthentication: true})],
        loadComponent: () => import('@pages/checkout/checkout.component').then(m => m.CheckoutComponent),
        data: {
          title: 'Checkout - Bazaar',
          description: 'Checkout your bazaar orders'
        }
      },
      {
        path: 'cart',
        canMatch: [authGuard({requiresAuthentication: true})],
        loadComponent: () => import('@pages/cart/cart.component').then(m => m.CartComponent),
        data: {
          title: 'Cart - Bazaar',
          description: 'View items in your cart'
        }
      },
      {
        path: 'orders',
        canMatch: [authGuard({requiresAuthentication: true})],
        loadComponent: () => import('@pages/orders/orders.component').then(m => m.OrdersComponent),
        data: {
          title: 'Orders - Bazaar',
          description: 'View all your bazaar orders'
        }
      },
      {
        path: 'summary',
        canMatch: [authGuard({requiresAuthentication: true})],
        loadComponent: () => import('@pages/order-summary/order-summary.component').then(m => m.OrderSummaryComponent),
        data: {
          title: 'Order summary - Bazaar',
          description: 'View your bazaar order summary'
        }
      },
      {
        path: 'error',
        loadComponent: () => import('@pages/server-error/server-error.component').then(m => m.ServerErrorComponent),
        data: {
          title: 'Error - Bazaar',
          description: 'We are already working on solving the error'
        }
      },
      {
        path: 'change-password',
        canMatch: [authGuard({requiresAuthentication: true})],
        loadComponent: () => import('@pages/auth/change-password/change-password.component').then(m => m.ChangePasswordComponent),
        data: {
          title: 'Change password - Bazaar',
          description: 'Change password to your Bazaar account'
        }
      },
      {
        path: '',
        loadComponent: () => import('@pages/home/home.component').then(m => m.HomeComponent),
        data: {
          title: 'Home - Bazaar',
          description: 'Bazaar - Your Ultimate Online Shopping Destination'
        }
      }
    ]
  }
]
