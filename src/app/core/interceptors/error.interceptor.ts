import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { PRIMARY_OUTLET, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { NOTYF } from '@core/utils/notyf.token';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Interceptor that handles server errors.
 *
 * @param request The request object.
 * @param next The next interceptor in the chain.
 *
 * @returns The next Observable.
 */
export const serverErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const notyf = inject(NOTYF);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if ([HttpStatusCode.Unauthorized].includes(error.status)) {
        auth.clearSession();
        router.navigateByUrl('/auth/login');
      } else if ([HttpStatusCode.Forbidden, HttpStatusCode.UnprocessableEntity, HttpStatusCode.BadRequest].includes(error.status)) {
        notyf.error(error.error.message);
      } else if (error.status === HttpStatusCode.NotFound) {
        notyf.error(error.error.message);
      } else if (error.status === HttpStatusCode.InternalServerError) {
        router.navigateByUrl('/error', { skipLocationChange: true });
      }
      return throwError(() => error);
    }),
  );
};
