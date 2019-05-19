import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { RegistrationComponent } from "./registration/registration.component";
import { LoginComponent } from "./login/login.component";


const ROUTES: Route[] = [
  {
    path: '', component: AuthComponent, children: [  {
      path: 'login', component: LoginComponent
  },
  {
      path: 'registration', component: RegistrationComponent
    }
  ]
  },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
