import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUserLogin, User } from '../user/user.model';
import { environment } from '../../environments/environment';
import { IRestUserResponse } from '../rest/rest.user';

@Injectable()
export class AuthService {

    private loginEndpoint = "/authenticate";
    private validateEndpoint = "/validate-token";

    constructor (
        private http: HttpClient
    ) {}


    login (login: IUserLogin): Observable<User> {

        return this.http.post<IRestUserResponse>(
            environment.apiBase + this.loginEndpoint,
            login
        ).pipe(
            map(
                (response: IRestUserResponse) => {
                    return User.transformRest(response.data);
                },
                (error: HttpErrorResponse) => {
                    return error;
                }
            )
        );

    }


    logout () {

    }


    validate () {

    }
}
