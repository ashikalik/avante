import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthRootComponent } from './auth-root/auth-root.component';
import { ReactivateAccountComponent } from './reactivate-account/reactivate-account.component';


const routes: Routes =
[
  {
    path: '',
    component: AuthRootComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent
      },
      {
        path: 'reset_password/:id',
        component: ResetPasswordComponent
      },
      {
        path: 'activate_account/:id',
        component: ActivateAccountComponent
      },
      {
        path: 'reactivation',
        component: ReactivateAccountComponent
      }
    ]
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
