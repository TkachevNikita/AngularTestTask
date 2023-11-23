import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BillingPageComponent } from './billing-page.component';
import { routing } from './billing-page-routing.module';

@NgModule({
  declarations: [
    BillingPageComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    routing
  ],
  providers: [
  ],
})
export class BillingModule { }
