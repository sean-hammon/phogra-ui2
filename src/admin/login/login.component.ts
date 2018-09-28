import { Component, OnDestroy, OnInit } from '@angular/core';
import { skip } from 'rxjs/operators';
import { IUserLogin, User } from '../../phogra/user/user.model';
import { LoginAction } from '../store/admin.actions';
import { Store } from '@ngrx/store';
import { AdminState, apiErrorState, userState } from '../store/admin.state';
import 'rxjs/add/operator/skip';
import { Router } from '@angular/router';

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
        private store: Store<AdminState>,
        private router: Router
    ) {
        this.busy = false;
        this.loginError = null;
        this.subscriptions = {
            loginSuccess: null,
            loginError: null
        };
        this.errorMessages = {
            'Unauthorized': "Login failed"
        }
    }

    ngOnInit() {
        this.subscriptions.loginError = this.store.select(apiErrorState)
            .pipe(
                skip(1)
            )
            .subscribe(error => {
                this.loginError = this.errorMessages[error.statusText];
            });
        this.subscriptions.loginSuccess = this.store.select(userState)
            .pipe(
                skip(1)
            )
            .subscribe(user => {
                this.router.navigateByUrl('/dashboard');

            });
    }


    ngOnDestroy() {
        this.subscriptions.loginError.unsubscribe();
        this.subscriptions.loginSuccess.unsubscribe();
    }

    onSubmit({value, valid}: {value: IUserLogin, valid: boolean}) {

        if (valid) {
            this.busy = true;
            this.store.dispatch(new LoginAction(value));
        }

    }

}
