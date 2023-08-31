import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@pages/auth/signin/signin.component').then(m => m.SigninComponent),
    data: {
      title: 'Log in - Bazaar',
      description: 'Log in to your bazaar account'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('@pages/auth/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Regsiter - Bazaar',
      description: 'Create your bazaar account'
    }
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('@pages/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
    data: {
      title: 'Reset password - Bazaar',
      description: 'Reset your password to your bazaar account'
    }
  },
  {
    path: 'set-password',
    loadComponent: () => import('@pages/auth/set-new-password/set-new-password.component').then(m => m.SetNewPasswordComponent),
    data: {
      title: 'Set new password - Bazaar',
      description: 'Create a new password for your bazaar account'
    }
  },
  {
    path: 'verify-email/:token/:email',
    loadComponent: () => import('@pages/auth/verify-email/verify-email.component').then(m => m.VerifyEmailComponent),
    data: {
      title: 'Verify your account - Bazaar',
      description: 'Verify your bazaar account'
    }
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  }
]
