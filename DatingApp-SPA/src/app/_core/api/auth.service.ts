import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { IUser } from '../../_models/User';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL: string;

  constructor(
    private http: HttpClient) {
    this.baseURL = environment.API + '/auth/';
  }

  login(credentials: IUser): Observable<void> {
    return this.http.post(this.baseURL + 'login', credentials).pipe(
      map((response: { token: string }) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('token', token);
        }
      }),
      catchError(err => throwError(err))
    );
  }
}
