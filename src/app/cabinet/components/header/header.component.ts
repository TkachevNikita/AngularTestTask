import { Component } from "@angular/core";
import { IUser } from "src/app/interfaces/user.interface";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent {
    public user: IUser = this._userService.getCurrentUser();

    constructor(private _userService: UserService) {
    }

}
