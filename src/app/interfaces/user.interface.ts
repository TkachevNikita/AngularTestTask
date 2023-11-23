export interface IUser {
  token: string,
  name: string,
  surname: string,
  password: string,
  email: string,
  webUrl?: string,
  role?: string;
  phone: string;
}
