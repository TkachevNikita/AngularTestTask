import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable()
export class ValidatorService {

    private _messages = {
        required: 'Это обязательное поле',
        passwordMinLength: 'Минимальное значение - 9 символов',
        email: 'Некорректный email',
        nameMinLength: 'Минимальное значение - 2 символа',
        maxLength: 'Максимальное значение - 255 символов',
        pattern: 'Неверный формат данных',
        phonePattern: 'Некорректный номер (пример: +7900000000)',
        webPattern: 'Некорректный web url (пример: nba.com)'
    }

    constructor() { }

    public getErrorMessage(control: AbstractControl, controlName: string): string | null {
      if (control.hasError('required')) {
        return this._messages.required;
      }

      if (control.hasError('maxLength')) {
        return this._messages.maxLength;
      }

      if (control.hasError('pattern')) {
        return this._messages.pattern;
      }

      switch(controlName) {
          case 'password':
              return this.getPasswordErrorMessage(control);
          case 'email':
              return this.getEmailErrorMessage(control);
          case 'name':
              return this.getNameErrorMessage(control);
          case 'phone':
              return this.getPhoneErrorMessage(control);
          case 'webUrl':
              return this.getWebUrlErrorMessage(control);
      }

      return null;
    }

    private getPhoneErrorMessage(control: AbstractControl): string | null {

      if (control.hasError('invalidPhoneNumber') || control.hasError('invalidPhoneNumberLength')) {
          return this._messages.phonePattern;
      }

      return null;
    }

    private getWebUrlErrorMessage(control: AbstractControl): string | null {

      if (control.hasError('invalidWebUrl')) {
          return this._messages.webPattern;
      }

      return null;
    }

    public webUrlValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const webUrl = control.value;
        if (webUrl && !/\..+/.test(webUrl)) {
          return { 'invalidWebUrl': true };
        }

        return null;
    }

    public phoneNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const phoneNumber = control.value;

        if (phoneNumber && !phoneNumber.startsWith('+7')) {
          return { 'invalidPhoneNumber': true };
        }

        const digitsOnly = phoneNumber.replace(/\D/g, '');
        if (digitsOnly.length !== 11) {
          return { 'invalidPhoneNumberLength': true };
        }

        return null;
    }

    private getPasswordErrorMessage(control: AbstractControl): string | null {
      if (control.hasError('minlength')) {
        return this._messages.passwordMinLength;
      }

      return null;
    }

    private getEmailErrorMessage(control: AbstractControl): string | null {
        if (control.hasError('email')) {
          return this._messages.email;
        }

        return null;
    }

    private getNameErrorMessage(control: AbstractControl): string | null {
      if (control.hasError('minlength')) {
        return this._messages.nameMinLength;
      }

      return null;
  }
}
