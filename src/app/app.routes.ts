import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@pages/auth/auth.routes').then(m => m.routes)
  },
  {
    path: '',
    loadChildren: () => import('@shared/components/store-layout/layout.routes').then(m => m.routes)
  }
];
