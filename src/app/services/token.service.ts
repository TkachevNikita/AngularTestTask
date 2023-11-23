import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
    public generateToken(): string {
        const token = uuidv4();
        return token;
    }
}
