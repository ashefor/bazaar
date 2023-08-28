import { ApplicationConfig, FactoryProvider, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NOTYF, notyfFactory } from '@core/utils/notyf.token';

import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { jwtInterceptor } from '@core/interceptors/jwt.interceptor';
import { serverErrorInterceptor } from '@core/interceptors/error.interceptor';

const dbConfig: DBConfig = {
  name: 'Bazaar-Store',
  version: 1,
  objectStoresMeta: [{
    store: 'cart',
    storeConfig: { keyPath: 'id', autoIncrement: false },
    storeSchema: [
      { name: 'id', keypath: 'id', options: { unique: true } },
      {
        name: 'product',
        keypath: 'product',
        options: {
          unique: false
        }
      },
      {
        name: 'quantity',
        keypath: 'quantity',
        options: {
          unique: false
        }
      }]
  }]
};
function myFactorys(): FactoryProvider[] {
  return [
    {
      provide: NOTYF,
      useFactory: notyfFactory
    }
  ]
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    myFactorys(),
    importProvidersFrom([BrowserAnimationsModule, NgxIndexedDBModule.forRoot(dbConfig)]),
    provideHttpClient(withInterceptors([jwtInterceptor, serverErrorInterceptor]))
  ]
};
