import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { PhograState } from '../phogra/store';
import { LoadGalleries } from '../phogra/store/galleries';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

    pageTitle = 'Sean Hammon Photography';

    constructor(
        private title: Title,
        private store: Store<PhograState>
    ) {}

    ngOnInit() {
        this.title.setTitle(this.pageTitle);
        this.store.dispatch(new LoadGalleries());
    }
}
