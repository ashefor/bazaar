import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { storage } from '@core/utils/storage/storage';
import { environment } from '@env/environment';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs/internal/Observable';
import { AuthResponse, User } from '@core/interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly _handler = inject(HttpBackend);
  private readonly _http = new HttpClient(this._handler);
  modulePath = 'auth'

  isAuthenticated$ = new BehaviorSubject<boolean>(!!storage.getToken());

  get isAuthenticated(): boolean {
    return this.isAuthenticated$.getValue();
  }
  constructor() { }

  clearSession() {
    this.isAuthenticated$.next(false);
    storage.removeItem('user');
    storage.removeItem('token');
    storage.removeItem('expiryDate');
  }

  handleLogin(params: { email: string, password: string }): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${environment.baseUrl}/${this.modulePath}/login`, params).pipe(tap((data) => {
      this.setSession(data);
    }));
  }

  createUser(params: Partial<{ email: string, first_name: string, last_name?: string, password: string, confirm_password: string }>): Observable<{message: string, userId: string}> {
    return this._http.post<{message: string, userId: string}>(`${environment.baseUrl}/${this.modulePath}/register`, params)
  }

  resetPassword(email: string): Observable<{message: string}> {
    return this._http.post<{message: string}>(`${environment.baseUrl}/${this.modulePath}/reset-password`, {email})
  }

  setNewPassword(params: Partial<{ password: string, confirm_password: string, resetToken: string }>): Observable<{message: string}> {
    return this._http.post<{message: string}>(`${environment.baseUrl}/${this.modulePath}/set-new-password`, params)
  }

  verifyEmail(token: string, email: string): Observable<{message: string}> {
    return this._http.get<{message: string}>(`${environment.baseUrl}/${this.modulePath}/verify-email/${token}/${email}`)
  }

  resendVerificationEmail(email: string): Observable<{message: string}> {
    return this._http.get<{message: string}>(`${environment.baseUrl}/${this.modulePath}/resend-verify-email/${email}`,)
  }


  setSession(params: AuthResponse): void {
    console.log(params);
    storage.setItem('user', params.user);
    storage.setItem('token',  params.token);
    storage.setItem('expiryDate', params.expiresIn);
    this.isAuthenticated$.next(true);
  }
}
