import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { IUser } from "src/app/interfaces/user.interface";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent {
    public user: IUser = this._userService.getCurrentUser();

    public logout(): void {
        localStorage.removeItem('token');
        this._router.navigate(['/auth/login']);
    }

    constructor(private _userService: UserService, private _router: Router) {
    }

}
