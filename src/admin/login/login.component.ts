import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserLogin, User } from '../../phogra/user/user.model';
import { LoginAction } from '../store/admin.actions';
import { Store } from '@ngrx/store';
import { AdminState, apiErrorState, userState } from '../store/admin.state';
import 'rxjs/add/operator/skip';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {

    busy: boolean;
    loginError: string;

    constructor(
        private store: Store<AdminState>
    ) {
        this.busy = false;
    }

    ngOnInit() {
    ngOnDestroy() {
    }

    onSubmit({value, valid}: {value: IUserLogin, valid: boolean}) {

        if (valid) {
            this.busy = true;
            this.store.dispatch(new LoginAction(value));
        }

    }

}
