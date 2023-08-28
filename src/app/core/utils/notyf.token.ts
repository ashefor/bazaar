import { InjectionToken } from '@angular/core';
import { Notyf } from 'notyf';

export const NOTYF = new InjectionToken<Notyf>('NotyfToken');

export function notyfFactory(): Notyf {
  return new Notyf({
    duration: 5000,
    position: {
      x: 'right',
      y: 'top'
    },
    types: [
      {
        type: 'info',
        background: '#03a9f4',
        dismissible: true
      },
      {
        type: 'warning',
        background: '#ff9800',
        dismissible: true
      }
    ]
  });
}
