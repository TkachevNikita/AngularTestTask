import { Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { AuthResult } from "src/app/interfaces/auth-result.interface";
import { IUser } from "src/app/interfaces/user.interface";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { ValidatorService } from "src/app/services/validators.service";

@Component({
    templateUrl: 'register.component.html',
    selector: 'auth-register',
    styleUrls: ['../../auth.component.scss']
})

export class RegisterComponent {
    public registerForm!: FormGroup;
    public phoneNumber: string = '+7';
    private _subscription$: Subject<void> = new Subject<void>();

    constructor(
      private _authService: AuthService,
      private _snackBar: MatSnackBar,
      private _router: Router,
      private _validators: ValidatorService,
      private _userService: UserService
    ) {
        this.registerForm = new FormGroup({
            userName: new FormControl('',
            [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(255),
              Validators.pattern(/^[а-яА-Яa-zA-Z]+$/)
            ]),
            userSurname: new FormControl('',
            [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(255),
              Validators.pattern(/^[а-яА-Яa-zA-Z]+$/)
            ]),
            userPhone: new FormControl('',
            [
                Validators.required,
                this._validators.phoneNumberValidator
            ]),
            userEmail: new FormControl('',Validators.email),
            userPassword: new FormControl('',[Validators.required, Validators.minLength(9), Validators.maxLength(25)]),
      })
    }

    public onPhoneNumberBlur(): void {
      if (this.phoneNumber && !this.phoneNumber.startsWith('+7')) {
        this.phoneNumber = '+7' + this.phoneNumber;
      }
    }

    public getErrorMessage(control: AbstractControl, controlName: string) {
        return this._validators.getErrorMessage(control, controlName);
    }

    public openSnackBar(response: AuthResult): void {
        const key = response.success ? 'success' : 'error'
        this._snackBar.open(response.message, 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar' + '__' + key]
        });
    }

    public onSubmit(): void {
        this._authService.registerUser(this.registerForm)
          .pipe(
            takeUntil(this._subscription$)
          )
          .subscribe(response => {
              if (response.success) {
                setTimeout(() => {
                  this._router.navigate(['/auth/login']);
                }, 3000)
              }
              this.openSnackBar(response)
          });
    }

    public ngOnDestroy(): void {
      this._subscription$.unsubscribe();
  }
}
