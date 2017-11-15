import { Injectable } from '@angular/core';
import { AuthService } from '../../phogra/auth/auth.service';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { AdminActions, LoginErrorAction, LoginSuccessAction } from './admin.actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

@Injectable()
export class LoginEffects {

    constructor (
        private actions$: Actions,
        private auth: AuthService
    ) {}


    @Effect()
    doLogin$ = this.actions$
        .ofType(AdminActions.LOGIN)
        .map(toPayload)
        .flatMap(
            credentials => {
                return this.auth.login(credentials)
                    .map(user => new LoginSuccessAction(user))
                    .catch((response) => Observable.of(new LoginErrorAction(response)))
            }
        );

}
