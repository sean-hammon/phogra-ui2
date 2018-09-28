import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap, pluck } from 'rxjs/operators';
import { AuthService } from '../../phogra/auth/auth.service';
import { Actions, Effect } from '@ngrx/effects';
import { AdminActions, LoginErrorAction, LoginSuccessAction } from './admin.actions';

@Injectable()
export class LoginEffects {

    constructor (
        private actions$: Actions,
        private auth: AuthService
    ) {}


    // @Effect()
    // doLogin$ = this.actions$
    //     .ofType(AdminActions.LOGIN)
    //     .pipe(
    //         pluck(),
    //         flatMap(
    //             credentials => {
    //                 return this.auth.login(credentials)
    //                     .map(user => new LoginSuccessAction(user))
    //                     .catch((response) => Observable.of(new LoginErrorAction(response)))
    //             }
    //         )
    //     )

}
