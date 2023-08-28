import { Component, Input, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { NotyfService } from '@core/services/notyf.service';

@Component({
  selector: 'app-set-new-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss']
})
export class SetNewPasswordComponent implements OnDestroy {
  @Input() token?: string;
  private readonly router = inject(Router);
  private readonly notyf = inject(NotyfService)
  private readonly service = inject(AuthService);
  private readonly destroy$ = new Subject<boolean>();
  isLoading = false;
  errorMsg: string | undefined;

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.setNewPasswordForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  setNewPasswordForm = inject(NonNullableFormBuilder).group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm_password: ['', [Validators.required, this.confirmationValidator]]
  })

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  get formControls() {
    return this.setNewPasswordForm.controls
  }

  handleSetNewPassword() {
    if (this.setNewPasswordForm.valid) {
      this.isLoading = true;
      this.setNewPasswordForm.disable();
      this.errorMsg = undefined;
      this.service.setNewPassword({...this.setNewPasswordForm.value, resetToken: this.token}).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          this.errorMsg = undefined;
          this.notyf.success(data.message);
          this.router.navigate(['/auth/login'], { replaceUrl: true });
          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.setNewPasswordForm.enable();
          this.isLoading = false;
          if(error.status == HttpStatusCode.Unauthorized) {
            this.router.navigate(['/auth/reset-password'], { replaceUrl: true });
          } else if ([HttpStatusCode.BadRequest, HttpStatusCode.UnprocessableEntity].includes(error.status)) {
            this.errorMsg = error.error.message
          } else {
            this.errorMsg = 'Can not log you in right now. Please try again later or contact support';
          }
        }
      })
    } else {
      Object.values(this.formControls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }
}
