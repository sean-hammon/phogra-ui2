import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserLogin, User } from 'phogra/user/user.model';
import { Router } from '@angular/router';
import { apiErrorState, userState } from 'admin/store/admin.state';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {

    busy: boolean;
    loginError: string;
    subscriptions: any;
    errorMessages: any;

    constructor(
        private router: Router
    ) {
        this.busy = false;
        this.loginError = null;
        this.subscriptions = {
            loginSuccess: null,
            loginError: null
        };
        this.errorMessages = {
            'Unauthorized': 'Login failed'
        };
    }

    ngOnInit() {
    }


    ngOnDestroy() {
    }

    onSubmit({value, valid}: {value: IUserLogin, valid: boolean}) {

        if (valid) {
            this.busy = true;
        }

    }

}
