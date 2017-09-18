import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PhotoResolver implements Resolve<boolean> {

    constructor() {
    }


    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        console.log('gallery resolver');
        return Observable.of(true);
    }
}
