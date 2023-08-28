import { StorageObjectType, StorageObjectData } from "./storage.type";
import ls from 'localstorage-slim';
import * as Crypto from 'crypto-js';
import { User } from "@core/interfaces/user.interface";
// import { User } from "@core/interfaces/user.interface";

ls.config.encrypt = true;
ls.config.secret = ''

 function getItem(key: any) {
    const data = localStorage.getItem(key.toString());
    return data ? (JSON.parse(data)) : null;
  }

  function setItem(key: any, data: any): void {
  if (data === null || data === undefined) {
      return;
  }
  localStorage.setItem(key.toString(), JSON.stringify(data));
}

function removeItem(key: any): void {
  localStorage.removeItem(key.toString());
}

function clear(): void {
  localStorage.clear();
}

function getToken():string {
  const tokenInstance = getItem('token');
  const token = tokenInstance ? tokenInstance: ''
  return token!;
}

function getUser(): User | null {
  const userInstance = getItem('user');
  const user = userInstance ? userInstance: null
  return user!;
}

// function getItem<T extends StorageObjectType>(item: T, options?: StorageOptions): StorageObjectData<T>['data'] | null {
//   const api = getStorageApi(options?.api || 'LocalStorage');
//   const data = api.getItem(item.toString());
//   return data ? (JSON.parse(data) as StorageObjectData<T>['data']) : null;
// }

// function setItem<T extends StorageObjectType>(
//   itemName: T,
//   data: StorageObjectData<T>['data'],
//   options?: StorageOptions,
// ): void {
//   if (data === null || data === undefined) {
//       return;
//   }

//   const api = getStorageApi(options?.api || 'LocalStorage');
//   api.setItem(itemName, JSON.stringify(data));
// }

// function removeItem<T extends StorageObjectType>(item: T, options?: StorageOptions): void {
//   const api = getStorageApi(options?.api || 'LocalStorage');
//   api.removeItem(item);
// }

// function clear(options?: StorageOptions): void {
//   const api = getStorageApi(options?.api || 'LocalStorage');
//   api.clear();
// }

// function getToken(options?: StorageOptions):string {
//   const tokenInstance = getItem('appSession', { api: options?.api || 'LocalStorage'});
//   const token = tokenInstance ? tokenInstance.token: ''
//   return token!;
// }

// function getUser(options?: StorageOptions): User | null {
//   const tokenInstance = getItem('appSession', { api: options?.api || 'LocalStorage'});
//   const user = tokenInstance ? tokenInstance.user: null
//   return user!;
// }

export const storage = {
    getItem,
    setItem,
    removeItem,
    clear,
    getToken,
    getUser
};
