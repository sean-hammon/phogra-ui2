import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../phogra/auth/auth.service';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { AdminActions, LoginErrorAction, LoginSuccessAction, NoOpAction } from './admin.actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginEffects {

    constructor (
        private actions$: Actions,
        private auth: AuthService,
        private router: Router
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

    /**
     * After the store has been updated, navigate to the appropriate
     * user dashboard.
     *
     * @type {Observable<any>}
     */
    @Effect()
    doNav$ = this.actions$
        .ofType(AdminActions.LOGIN_SUCCESS)
        .map(toPayload)
        .map(
            user => {
                this.router.navigate(['/dashboard']);

                return new NoOpAction();
            }
        )
        .catch((err) => Observable.of(new LoginErrorAction(err)));
}
