import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularLogoComponent } from './angular-logo/angular-logo.component';
import { RouterModule } from '@angular/router';
import { UserIdleModule } from 'angular-user-idle';

@NgModule({
  declarations: [AngularLogoComponent],
  imports: [
    CommonModule,
    RouterModule,
    UserIdleModule.forRoot({ idle: 60, timeout: 30, ping: 20 })
  ],
  exports: [AngularLogoComponent, RouterModule]
})
export class SharedModule {}
