import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { InventoryPageComponent } from './inventory-page.component';
import { routing } from './inventory-page-routing.module';

@NgModule({
  declarations: [
    InventoryPageComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    routing
  ],
  providers: [
  ],
})
export class InventoryModule { }
