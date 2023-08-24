import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'signin',
    loadComponent: () => import('@pages/auth/signin/signin.component').then(m => m.SigninComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('@pages/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('@pages/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'set-password',
    loadComponent: () => import('@pages/auth/set-new-password/set-new-password.component').then(m => m.SetNewPasswordComponent)
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  }
]
