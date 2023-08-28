import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { NotyfService } from '@core/services/notyf.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
  @Input() token: string = '';
  @Input() email: string = '';
  private readonly router = inject(Router);
  private readonly service = inject(AuthService);
  private readonly notyf = inject(NotyfService)
  private readonly destroy$ = new Subject<boolean>();
  isLoading = false;
  hasError = false

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.verifyEmail()
  }

  verifyEmail() {
    if (this.token && this.email) {
      this.isLoading = true;
      this.hasError = false;
    this.service.verifyEmail(this.token, this.email).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.hasError = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.hasError = true;
        // if ([HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden, HttpStatusCode.UnprocessableEntity].includes(error.status)) {
        //   this.hasError = true;
        // }
      }
    });
    }
  }

  resendEmail() {
    this.service.resendVerificationEmail(this.email).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.notyf.success(data.message)
      },
      error: (error: HttpErrorResponse) => {
      }
    })
  }
}
