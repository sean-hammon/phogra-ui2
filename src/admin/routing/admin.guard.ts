import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { UserStorage } from 'phogra/user/user.storage';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private userStorage: UserStorage,
        private router: Router
    ){}

    canActivate(): boolean {
        if (this.userStorage.validateUser()) {
            return true;
        } else {
            this.router.navigate(['']);
            return false;
        }
    }
}
