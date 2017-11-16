import { Injectable } from '@angular/core';
import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { TokenStorage } from './token.storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenRequestInterceptor implements HttpInterceptor {

    constructor(private storage: TokenStorage) {}

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

            const token = this.storage.getToken();
            if (token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer: ${token}`
                    }
                });
            }

        }

        return next.handle(request);
    }

}


@Injectable()
export class TokenResponseInterceptor implements HttpInterceptor {

    constructor(private storage: TokenStorage) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {

        return next.handle(request)
            .do((event: HttpEvent<any>) => {

                if (event instanceof HttpResponse) {
                    const jot = event.headers.get(environment.jwtStorageKey);
                    if (jot) {
                        this.storage.setToken(jot);
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
