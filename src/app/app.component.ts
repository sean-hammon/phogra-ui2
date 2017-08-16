import {Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from "@ngrx/store";
import { AppState } from "./store/app.state";
import { FETCH_GALLERIES } from "./store/app.actions";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

    pageTitle = 'Sean Hammon Photography';

    constructor(
        private store: Store<AppState>,
        private title: Title
    ) {}

    ngOnInit() {
        this.title.setTitle(this.pageTitle);
        this.store.dispatch({
            type: FETCH_GALLERIES
        });
    }
}
