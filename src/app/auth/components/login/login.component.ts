import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthResult } from "src/app/interfaces/auth-result.interface";
import { Router } from "@angular/router";
import { ValidatorService } from "src/app/services/validators.service";
import { Subject } from "rxjs";

@Component({
  templateUrl: 'login.component.html',
  selector: 'auth-login',
  styleUrls: ['../../auth.component.scss']
})

export class LoginComponent {

    public loginForm!: FormGroup;
    private _subscription$: Subject<void> = new Subject<void>();

    constructor(
      private _authSevice: AuthService,
      private _snackBar: MatSnackBar,
      private _router: Router,
      private _validators: ValidatorService
    ) {

      this.loginForm = new FormGroup({
          userEmail: new FormControl('', [Validators.required, Validators.email]),
          userPassword: new FormControl('', [Validators.required, Validators.minLength(9)]),
      })
    }

    public getEmailErrorMessage(): string | null {
        return this._validators.getErrorMessage(this.loginForm.get('userEmail')!, 'email');
    }

    public getPasswordErrorMessage(): string | null {
      return this._validators.getErrorMessage(this.loginForm.get('userPassword')!, 'password');
    }

    public openSnackBar(response: AuthResult): void {
        const key = response.success ? 'success' : 'error';
        this._snackBar.open(response.message, 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar' + '__' + key]
        });
    }

    public onSubmit(): void {
        const email = this.loginForm.controls['userEmail'].value;
        const password = this.loginForm.controls['userPassword'].value
        this._authSevice.authUser(email, password).subscribe(
          response => {
              this.openSnackBar(response);
              if (response.success) {
                  this._router.navigate(['/cabinet/home'])
              }
        });
    }

    public ngOnDestroy(): void {
      this._subscription$.unsubscribe();
    }
}
