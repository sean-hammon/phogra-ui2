import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";
import { GET_GALLERIES } from "../store/app.actions";

@Component({
    selector: 'app-viewport',
    templateUrl: './viewport.component.html',
    styleUrls: ['./viewport.component.sass'],
    host: {
        class: 'full-frame'
    }
})
export class ViewportComponent implements OnInit {

    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit() {

        this.store.dispatch({
            type: GET_GALLERIES
        });

    }

}
