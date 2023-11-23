import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CabinetGuardService } from './services/cabinet.guard.service';
import { UserService } from './services/user.service';
import { ValidatorService } from './services/validators.service';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
  ],
  providers: [
    CabinetGuardService,
    UserService,
    ValidatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
