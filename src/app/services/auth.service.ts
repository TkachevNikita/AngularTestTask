import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { UserService } from './user.service';
import { Observable, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AuthResult } from '../interfaces/auth-result.interface'
import { FormGroup } from '@angular/forms';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {

    constructor(private _userService: UserService, private _tokenService: TokenService) { }

    public authUser(email: string, password: string): Observable<AuthResult> {
        return this.findUserByEmail(email).pipe(
            switchMap(user => {
                if (user) {
                    if (this.checkUserData(user, password)) {
                        localStorage.setItem('token', user.token);
                        return of({ success: true, message: 'Авторизация успешна' });
                    } else {
                        return of({ success: false, message: 'Неверный пароль' });
                    }
                } else {
                    return of({ success: false, message: 'Пользователь не найден' });
                }
            })
        );
    }

    public registerUser(data: FormGroup): Observable<AuthResult> {
      const email = data.value.userEmail;
      const phone = data.value.userPhone;

      const newUser = {
          name: data.value.userName,
          email: data.value.userEmail,
          surname: data.value.userSurname,
          phone: data.value.userPhone,
          password: data.value.userPassword,
          token: this._tokenService.generateToken()
      };

      return forkJoin([this.findUserByEmail(email), this.findUserByPhone(phone)]).pipe(
          switchMap(([userWithEmail, userWithPhone]) => {
              if (!userWithEmail && !userWithPhone) {
                  this._userService.addNewUser(newUser);
                  return of({ success: true, message: 'Регистрация успешна' });
              } else if (userWithEmail) {
                  return of({ success: false, message: 'Данный email зарегистрирован' });
              } else if (userWithPhone) {
                  return of({ success: false, message: 'Данный номер телефона уже зарегистрирован' });
              } else {
                  return of({ success: false, message: 'Не удалось зарегистрировать пользователя' });
              }
          })
      );
  }



    private findUserByPhone(phone: string): Observable<UserModel | undefined> {
        const user = this._userService.getUsers().pipe(
            map(users => users.find(user => user.phone === phone))
        );

        return user;
    }

    private findUserByEmail(email: string): Observable<UserModel | undefined> {
        const user = this._userService.getUsers()
            .pipe(
                map(users => users.find(user => user.email === email)),
            );

        return user;
    }



    private checkUserData(user: IUser, password: string): boolean {
        if (user.password === password) {
            return true;
        }

        return false;
    }
}
