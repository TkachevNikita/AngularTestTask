import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HomePageComponent } from './home-page.component';
import { routing } from './home-page-routing.module';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    routing
  ],
  providers: [
  ],
})
export class HomeModule { }
