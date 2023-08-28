import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnDestroy {
  private readonly router = inject(Router);
  private readonly service = inject(AuthService);
  private readonly destroy$ = new Subject<boolean>();
  isLoading = false;
  errorMsg: any;

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.errorMsg = undefined;
  }

  handleLogin(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.errorMsg = undefined;
      this.service.handleLogin(form.value).pipe(takeUntil(this.destroy$)).subscribe({
        next:(data) => {
          this.isLoading = false;
          this.router.navigate(['/']);
          this.errorMsg = undefined;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error.message)
          console.log(form.controls)
          this.isLoading = false;
          if ([HttpStatusCode.BadRequest, HttpStatusCode.Unauthorized].includes(error.status)) {
            this.errorMsg = error.error.message
          } else {
            this.errorMsg = 'Can not log you in right now. Please try again later or contact support';
          }
        }
      });
    }
  }
}
