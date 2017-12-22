import { Injectable } from '@angular/core';
import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import { UserStorage } from 'phogra/user/user.storage';
import { JwtHelperService } from './jwt-helper.service';
import { User } from 'phogra/user/user.model';

@Injectable()
export class TokenRequestInterceptor implements HttpInterceptor {

    constructor(private userStorage: UserStorage) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url.indexOf('authenticate') >= 0) {

            const base64 = btoa(request.body.email + ":" + request.body.password);
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${base64}`
                },
                body: ''
            });

        } else {

            const user = this.userStorage.fetchUser();
            if (user.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer: ${user.token}`
                    }
                });
            }

        }

        return next.handle(request);
    }

}


@Injectable()
export class TokenResponseInterceptor implements HttpInterceptor {

    constructor(
        private userStorage: UserStorage,
        private jwtHelper: JwtHelperService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {

        return next.handle(request)
            .do((event: HttpEvent<any>) => {

                if (event instanceof HttpResponse) {
                    const jot = event.headers.get(environment.jwtStorageKey);
                    if (jot) {
                        let user = this.userStorage.fetchUser();
                        const decoded = this.jwtHelper.decodeToken(jot);
                        if (user) {
                            if (user.id == decoded.sub) {
                                user.token = jot;
                                this.userStorage.storeUser(user);
                            } else {
                                throw new Error('Token and stored user do not match.');
                            }
                        } else {
                            user = User.transformRest(event.body.data);
                            this.userStorage.storeUser(user);
                        }
                    }
                }

            })
            .catch((response: any ) => {
                if (response instanceof  HttpErrorResponse) {
                    if (response.status === 401) {
                        //TODO: Handle unauthorized request
                    }
                }

                return Observable.throw(response);
            });
    }

}
