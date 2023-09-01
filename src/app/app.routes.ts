import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@pages/auth/auth.routes').then(m => m.routes),
    data: {
      title: 'Account - Bazaar',
      description: 'Access your bazaar account'
    }
  },
  {
    path: '',
    loadChildren: () => import('@shared/components/store-layout/layout.routes').then(m => m.routes),
    data: {
      title: 'Home - Bazaar',
      description: 'Bazaar - Your Ultimate Online Shopping Destination'
    }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
