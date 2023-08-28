import { Inject, Injectable } from '@angular/core';
import { NOTYF } from '@core/utils/notyf.token';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class NotyfService {

  constructor(@Inject(NOTYF) private notyf: Notyf) { }

  success(message: string) {
    this.notyf.success(message);
  }

  error(message: string) {
    this.notyf.error(message);
  }

  info(message: string) {
    this.notyf.open({
      type: 'info',
      background: '#03a9f4',
      message
    })
  }

  warning(message: string) {
    this.notyf.open({
      type: 'warning',
      background: '#ff9800',
      message
    })
  }
}
