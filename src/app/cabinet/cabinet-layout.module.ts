import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/user.service';
import { ValidatorService } from '../services/validators.service';
import { CabinetLayoutComponent } from './cabinet-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { routing } from './cabinet-layout-routing.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    CabinetLayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    routing
  ],
  providers: [
    UserService,
    ValidatorService
  ],
})
export class CabinetLayoutModule { }
