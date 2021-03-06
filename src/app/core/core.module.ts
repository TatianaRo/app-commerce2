import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';



@NgModule({
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,   
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
    ]),
  ],
  exports: [
    BsNavbarComponent, 
  ]
})
export class CoreModule { }
