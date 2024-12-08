import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmSignUpComponent } from './confirm-sign-up/confirm-sign-up.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Default route to LoginComponent
  { path: 'register', component: RegisterComponent },
  { path: 'confirmSignUp', component: ConfirmSignUpComponent },
];
