import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { Observable, Subject, map, mergeMap, of, takeUntil } from 'rxjs';
import { UserModel } from '../models/user.model';
import { TokenService } from './token.service';
import { FormGroup } from '@angular/forms';

@Injectable()
export class UserService {
    private _user!: IUser;
    private _subscription$: Subject<void> = new Subject<void>();
    constructor(
        private _tokenService: TokenService
    ) { }

    public getCurrentUser(): IUser {
        this.getUsers()
          .pipe(
              takeUntil(this._subscription$),
              map(users => users.find(user => user.token === localStorage.getItem('token')))
          )
          .subscribe(user => {
              if (user) {
                  this._user = user;
              }
          });

          return this._user;
    }

    public addNewUser(user: IUser): void {
        if (localStorage.getItem('users')) {
            const users = JSON.parse(localStorage.getItem('users')!);
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
        } else {
            localStorage.setItem('users', JSON.stringify([user]))
        }
    }

    public editUser(data: FormGroup) {
        this.requestUsers().pipe(
          map((users: IUser[]) => {
              const updatedUsers = users.map(user => {
                  if (user.token === localStorage.getItem('token')) {
                      return {
                          ...user,
                          name: data.value.userName,
                          surname: data.value.userSurname,
                          phone: data.value.userPhone,
                          webUrl: data.value.userWebUrl

                      }
                  } else {
                      return user
                  }
              })

              return updatedUsers;
          })
        )
        .subscribe(users => localStorage.setItem('users', JSON.stringify(users)))
    }

    public getUsers(): Observable<UserModel[]> {

        return this.requestUsers()
            .pipe(
                map((data: IUser[]) => data.map((user: IUser) => new UserModel(user)))
            );
    }

    private requestUsers(): Observable<IUser[]> {
        if (localStorage.getItem('users')) {
            return of(JSON.parse(localStorage.getItem('users')!));
        }

        return of([]);
    }

    public ngOnDestroy(): void {
      this._subscription$.unsubscribe();
    }
}
