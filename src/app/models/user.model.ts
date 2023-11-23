import { IUser } from "../interfaces/user.interface";

export class UserModel {

    public readonly name: string;
    public readonly surname: string;
    public readonly password: string;
    public readonly email: string;
    public readonly phone: string;
    public readonly token: string;
    public readonly webUrl: string | undefined;

    constructor(data: IUser) {
        this.surname = data.surname;
        this.name = data.name;
        this.password = data.password;
        this.email = data.email;
        this.phone = data.phone;
        this.token = data.token;
        this.webUrl = data.webUrl;
    }
}
