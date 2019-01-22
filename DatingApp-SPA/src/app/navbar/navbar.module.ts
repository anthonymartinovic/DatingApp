import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
