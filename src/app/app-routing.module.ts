import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/pre-login/login/login.component';
import { HomeComponent } from './components/post-login/home/home.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'home',
    canActivate: [AuthGuardGuard],
    loadChildren: './components/post-login/post-login.module#PostLoginModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
