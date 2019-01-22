import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IValue } from '../_models/Value';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValueComponent implements OnInit {
  private ENV: string;
  values$: Observable<IValue[]>;

  constructor(
    private http: HttpClient) {
    this.ENV = environment.API;
  }

  ngOnInit(): void {
    this.values$ = this.getValues();
  }

  getValues(): Observable<IValue[]> {
    return <Observable<IValue[]>>this.http.get(`${this.ENV}/values`).pipe(
      catchError(err => {
        console.log(err);
        return of(err);
      })
    );
  }

}
