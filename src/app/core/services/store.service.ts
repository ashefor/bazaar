import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.development';
import { Product, ProductsData } from '@core/interfaces/product.interface';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { delay } from 'rxjs/internal/operators/delay';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { CartItem, Order } from '@core/interfaces/cart.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly _http = inject(HttpClient);
  // private readonly _storage = inject(StorageMap)
  private readonly _storage = inject(NgxIndexedDBService)
  modulePath = 'products';
  orderModulePath = 'orders';
  cartTotal$ = new BehaviorSubject<number>(0);
  constructor() { }

  get cartTotal(): Observable<number> {
    return this.cartTotal$.asObservable();
  }

  setCartTotal(total: number) {
    this.cartTotal$.next(total);
  }

  updateCartTotal() {
    const cartTotal = this.cartTotal$.getValue();
    console.log(cartTotal);
    this.cartTotal$.next(cartTotal + 1);
  }

  // fetch all products
  fetchProducts(): Observable<ProductsData> {
    return this._http.get<ProductsData>(`${environment.baseUrl}/${this.modulePath}`);
  }


  // fetch a single product
  fetchSingleProduct(productId: string): Observable<Product> {
    return this._http.get<{product: Product}>(`${environment.baseUrl}/${this.modulePath}/${productId}`).pipe(map(data => data.product))
  }

  //add product to cart
  addProductToCart(params: any) {
    return this._storage.add('cart', params).pipe(delay(3000)).pipe(tap((data: any[]) => {
      this.updateCartTotal()
    }));
  }

  getCartItems(): Observable<CartItem[]> {
    return this._storage.getAll('cart').pipe(tap((data: any[]) => {
      this.setCartTotal(data.reduce((acc, item) => acc + Number(item.quantity), 0))
    }));
  }

  getCartItem(productId: string) {
    return this._storage.getByID('cart', productId)
  }

  updateCartItem(params: any) {
    return this._storage.update('cart', params).pipe(tap((data: any[]) => {
      this.updateCartTotal()
    }));
  }

  deleteFromCart(productId: string) {
    return this._storage.delete('cart', productId)
  }

  createOrder(params: { shipping: { delivery: number; delivery_type: string; total: number; address?: string | undefined; phone?: string | undefined; first_name?: string | undefined; last_name?: string | undefined; city?: string | undefined; state?: string | undefined; }; items: CartItem[]; }): Observable<{data: any}> {
    return this._http.post<{data: {data: any}}>(`${environment.baseUrl}/${this.orderModulePath}/create`, params)
  }

  verifyPaystackOrder(reference: string): Observable<{order: Order}> {
    return this._http.get<{order: Order}>(`${environment.baseUrl}/${this.orderModulePath}/summary?reference=${reference}`)
  }

  fetchOrders(): Observable<{orders: Order[]}> {
    return this._http.get<{orders: Order[]}>(`${environment.baseUrl}/${this.orderModulePath}`)
  }
}