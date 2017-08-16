import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import "rxjs/add/operator/filter";
import "rxjs/add/operator/skip";
import { Store } from "@ngrx/store";
import { currentPhoto } from "../store/app.state";

@Component({
    selector: 'app-topbar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit {

    photoTitle: string;

    constructor(
        private store: Store<any>,
        private router: Router
    ) {
        store.select(currentPhoto).skip(1)
            .subscribe(photo => {
                this.photoTitle = photo.title;
            });

    }


    ngOnInit() {
    }

}

