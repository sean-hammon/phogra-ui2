import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { JwtHelperService } from '../auth/jwt-helper.service';

@Injectable()
export class UserStorage {

    constructor(
        private jwtHelper: JwtHelperService
    ){}

    /**
     * Store a user object. If it's an object, stringify it first.
     *
     * @param {User | string} user
     */
    public storeUser(user: User | string): void {
        if (typeof user === 'object') {
            user = JSON.stringify(user);
        }
        localStorage.setItem(environment.userStorageKey, user);
    }

    /**
     * Retrieve a User object from storage.
     * Session and Local storage only store string data.
     *
     * @returns {User}
     */
    public fetchUser(): User {
        return User.parse(localStorage.getItem(environment.userStorageKey));
    }

    /**
     * Remove the user object currently in storage.
     */
    public removeUser(): void {
        localStorage.removeItem(environment.userStorageKey);
    }

    /**
     * Look for a user object in storage and make sure the JWT on
     * the user has not expired.
     *
     * @returns {boolean}
     */
    public validateUser(): boolean {
        const user = this.fetchUser();

        if (user && user.token) {
            return !this.jwtHelper.isTokenExpired(user.token);
        } else {
            return false;
        }
    }
}
