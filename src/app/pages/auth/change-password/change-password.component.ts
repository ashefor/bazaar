import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotyfService } from '@core/services/notyf.service';
import { StoreService } from '@core/services/store.service';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeaderComponent],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
   errorMsg: any;
   isLoading = false;
   private readonly destroy$ = new Subject<boolean>();
   private readonly notyf = inject(NotyfService);
   private readonly service = inject(StoreService);

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.changePasswordForm.controls.new_password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  changePasswordForm = inject(NonNullableFormBuilder).group({
    old_password: ['', Validators.required],
    new_password: ['', Validators.required],
    confirm_password: ['',[ Validators.required, this.confirmationValidator]],
  })

  get formControls() {
    return this.changePasswordForm.controls
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.changePasswordForm.controls.confirm_password.updateValueAndValidity());
  }

  handleChangePassword() {
    if (this.changePasswordForm.valid) {
      this.isLoading = true;
      this.changePasswordForm.disable();
      this.errorMsg = undefined;
      this.service.changePassword(this.changePasswordForm.value).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          this.notyf.success(data.message);
          this.errorMsg = undefined;
          this.isLoading = false;
          this.changePasswordForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          this.changePasswordForm.enable();
          this.isLoading = false;
          if ([HttpStatusCode.BadRequest, HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden, HttpStatusCode.UnprocessableEntity].includes(error.status)) {
            this.errorMsg = error.error.message
          } else {
            this.errorMsg = 'Unable to change your password right now. Please try again later or contact support';
          }
        }
      })
    } else {
      Object.values(this.formControls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true})
        }
      })
    }
  }
}
