import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReportsPageComponent } from './reports-page.component';
import { routing } from './reports-page-routing.module';

@NgModule({
  declarations: [
    ReportsPageComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    routing
  ],
  providers: [
  ],
})
export class ReportsModule { }
