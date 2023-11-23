import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class CabinetGuardService implements CanActivate {

    constructor(
        private _router: Router,
    ) {

    }

    public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (localStorage.getItem('token')) {
            return of(true);
        }

        return this._router.navigate(['/auth/login']);
    }
}
