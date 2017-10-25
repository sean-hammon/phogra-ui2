import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenStorage {

    public getToken(): string {
        return localStorage.getItem(environment.jwtStorageKey);
    }


    public setToken(token: string) {
        localStorage.setItem(environment.jwtStorageKey, token);
    }
}
