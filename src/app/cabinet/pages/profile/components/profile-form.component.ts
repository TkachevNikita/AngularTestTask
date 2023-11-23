import { Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IUser } from "src/app/interfaces/user.interface";
import { UserService } from "src/app/services/user.service";
import { ValidatorService } from "src/app/services/validators.service";

@Component({
    selector: 'app-profile-form',
    templateUrl: 'profile-form.component.html',
    styleUrls: ['./styles/profile-form.component.scss']
})
export class ProfileFormComponent {
    public profileForm!: FormGroup;
    public isChange = false;
    public currentUser: IUser = this._userService.getCurrentUser();
    public phoneNumber: string = this.currentUser.phone;

    constructor(
      private _userService: UserService,
      private _validators: ValidatorService,
      private _snackBar: MatSnackBar,
    ) {
        this.profileForm = new FormGroup({
            userName: new FormControl({value: this.currentUser.name, disabled: !this.isChange},
            [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(255),
              Validators.pattern(/^[a-zA-Z]+$/)
            ]),
            userSurname: new FormControl({value: this.currentUser.surname, disabled: !this.isChange},
            [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(255),
              Validators.pattern(/^[a-zA-Z]+$/)
            ]),
            userPhone: new FormControl({value: this.currentUser.phone, disabled: !this.isChange},
            [
                Validators.required,
                this._validators.phoneNumberValidator
            ]),
            userWebUrl: new FormControl({value: this.currentUser.webUrl, disabled: !this.isChange},
              [Validators.maxLength(255), this._validators.webUrlValidator]
            )
      })
    }

    public onPhoneNumberBlur(): void {
      if (this.phoneNumber && !this.phoneNumber.startsWith('+7')) {
        this.phoneNumber = '+7' + this.phoneNumber;
      }
    }

    public handleChange(e: Event): void {
        e.preventDefault()
        this.isChange = !this.isChange;

        if (this.isChange) {
          this.profileForm.enable();
        } else {
            this.profileForm.disable();
        }
    }

    public openSnackBar(): void {
      this._snackBar.open('Данные успешно обновлены', 'OK', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar__success']
      });
    }

    public getErrorMessage(control: AbstractControl, controlName: string): string | null {
      return this._validators.getErrorMessage(control, controlName);
    }

    public onSubmit(): void {
        this._userService.editUser(this.profileForm);
        this.openSnackBar();
        setTimeout(() => {
          location.reload();
        }, 3000);
    }
}
