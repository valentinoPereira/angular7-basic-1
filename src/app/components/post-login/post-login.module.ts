import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { UserIdleModule } from 'angular-user-idle';
import { PostLoginRoutingModule } from './post-login-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    PostLoginRoutingModule,
    UserIdleModule.forRoot({idle: 60, timeout: 30, ping: 20})
  ],
  exports: [HomeComponent]
})
export class PostLoginModule { }
