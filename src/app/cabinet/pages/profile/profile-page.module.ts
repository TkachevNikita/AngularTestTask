import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProfilePageComponent } from './profile-page.component';
import { routing } from './profile-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileFormComponent } from './components/profile-form.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileFormComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    routing,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    MatSnackBar
  ],
})
export class ProfileModule { }
