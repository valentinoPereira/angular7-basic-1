import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './http-interceptors';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { SharedModule } from './components/shared/shared.module';
import { PreLoginModule } from './components/pre-login/pre-login.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PreLoginModule
  ],
  providers: [httpInterceptorProviders, AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
