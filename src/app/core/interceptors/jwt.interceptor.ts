import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { storage } from '@core/utils/storage/storage';

/**
 * Interceptor that adds an Authorization header to requests that are authenticated and target the API URL.
 *
 * @param request The request object.
 * @param next The next interceptor in the chain.
 *
 * @returns The next Observable.
 */
export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const token = storage.getToken();

  const isRequestAuthorized = authService.isAuthenticated && !!token;
  if (isRequestAuthorized) {
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest);
  }

  return next(request);
};
