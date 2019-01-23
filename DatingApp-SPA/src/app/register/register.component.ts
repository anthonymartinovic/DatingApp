import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { userLoginFormModel } from '../_models/User';
import { AuthService } from '../_core/api/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  @Output() cancelRegistration = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(userLoginFormModel);
  }

  register() {
    this.authService.register(this.registerForm.value).pipe(
      first()
    ).subscribe(
      () => console.log('success'),
      () => console.log('error')
    );
  }

  cancel() {
    this.cancelRegistration.emit();
  }

}
