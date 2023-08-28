import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnDestroy {
  private readonly service = inject(AuthService);
  private readonly destroy$ = new Subject<boolean>();
  isLoading = false;
  hasSentResetInstructions = false;
  emailInput = ''
  errorMsg: string | undefined;

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.errorMsg = undefined;
  }
  handleResetPassword(email: NgModel) {
    if (email.valid) {
      this.errorMsg = undefined;
      this.isLoading = true;
      this.hasSentResetInstructions = false;
      this.service.resetPassword(email.value).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          this.hasSentResetInstructions = true
          this.isLoading = false;
          this.errorMsg = undefined;
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.hasSentResetInstructions = false
          if ([HttpStatusCode.BadRequest, HttpStatusCode.Unauthorized, HttpStatusCode.UnprocessableEntity].includes(error.status)) {
            this.errorMsg = error.error.message
          } else {
            this.errorMsg = 'Can not log you in right now. Please try again later or contact support';
          }
        }
      })
    }
  }

  resetAndUseDiffEmail() {
    this.emailInput = '';
    this.hasSentResetInstructions = false;
  }
}
