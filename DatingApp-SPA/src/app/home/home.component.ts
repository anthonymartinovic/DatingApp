import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  registerMode = false;

  constructor() {}

  showRegistrationForm() {
    this.registerMode = true;
  }

  hideRegistrationForm() {
    this.registerMode = false;
  }

}
