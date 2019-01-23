import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { userLoginFormModel } from '../_models/User';
import { AuthService } from '../_core/api/auth.service';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  loginForm: FormGroup;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(userLoginFormModel);
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  login() {
    this.authService.login(this.loginForm.value).pipe(
      first()
    ).subscribe(
      () => console.log('success'),
      () => console.log('error')
    );
  }

  logout() {
    this.authService.logout();
  }

}
