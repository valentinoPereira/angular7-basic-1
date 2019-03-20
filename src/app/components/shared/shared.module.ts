import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularLogoComponent } from './angular-logo/angular-logo.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AngularLogoComponent],
  imports: [CommonModule, RouterModule],
  exports: [AngularLogoComponent, RouterModule]
})
export class SharedModule {}
