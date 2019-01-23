import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { IUser } from '../../_models/User';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL: string;
  private loginState = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient) {
    this.baseURL = environment.API + '/auth/';
    if (this.getToken()) {
      this.loginState.next(true);
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.loginState.asObservable();
  }

  register(credentials: IUser): Observable<Object> {
    return this.http.post(this.baseURL + 'register', credentials).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  login(credentials: IUser): Observable<void> {
    return this.http.post(this.baseURL + 'login', credentials).pipe(
      map((response: { token: string }) => {
        const token = response.token;
        if (token) {
          this.setToken(token);
        }
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  logout(): void {
    this.removeToken();
  }

  private getToken(): string {
    return localStorage.getItem('token');
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
    this.loginState.next(true);
  }

  private removeToken(): void {
    localStorage.removeItem('token');
    this.loginState.next(false);
  }
}
