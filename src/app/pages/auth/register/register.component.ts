import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotyfService } from '@core/services/notyf.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  private readonly router = inject(Router)
  private readonly service = inject(AuthService);
  private readonly destroy$ = new Subject<boolean>();
  private readonly notyf = inject(NotyfService)
  isLoading = false;
  hasCreatedAccount = false
  errorMsg: any;

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  registerForm = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm_password: ['', [Validators.required, this.confirmationValidator]],
    first_name: ['', [Validators.required]],
    last_name: [''],
  })

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.errorMsg = undefined;
  }

  get formControls() {
    return this.registerForm.controls
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.registerForm.controls.confirm_password.updateValueAndValidity());
  }

  handleRegister() {
    if (this.registerForm.valid) {
      this.errorMsg = undefined;
      this.isLoading = true;
      this.registerForm.disable();
      this.service.createUser(this.registerForm.value).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          this.errorMsg = undefined;
          this.hasCreatedAccount = true;
          this.isLoading = false;
          // this.router.navigate(['/auth/login'])
          this.registerForm.enable();
        },
        error: (error: HttpErrorResponse) => {
          this.registerForm.enable();
          this.isLoading = false;
          if ([HttpStatusCode.BadRequest, HttpStatusCode.Unauthorized, HttpStatusCode.UnprocessableEntity].includes(error.status)) {
            this.errorMsg = error.error.message
          } else {
            this.errorMsg = 'Can not log you in right now. Please try again later or contact support';
          }
        }
      });
    } else {
      Object.values(this.formControls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      })
    }
  }

  resendEmail() {
    this.service.resendVerificationEmail(this.registerForm.value.email!).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.notyf.success(data.message)
      }
    })
  }
}
