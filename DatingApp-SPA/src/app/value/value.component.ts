import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface IValue {
  name: string;
  id: number;
}

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValueComponent implements OnInit {
  private ENV: string;
  values: IValue[];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef) {
    this.ENV = environment.API;
  }

  ngOnInit(): void {
    this.getValues();
  }

  getValues(): void {
    this.http.get(`${this.ENV}/values`).subscribe(
      (res: IValue[]) => {
        this.values = res;
        this.cdr.markForCheck();
      },
      err => console.log(err)
    );
  }

}
