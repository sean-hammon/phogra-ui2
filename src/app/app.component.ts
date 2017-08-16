import {Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from "@ngrx/store";
import { galleryState } from "./store/app.state";
import { FETCH_GALLERIES, SET_CURRENT_GALLERY } from "./store/app.actions";
import { GalleryProvider } from "../phogra/galleries/gallery.provider";
import "rxjs/add/operator/skip";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

    pageTitle = 'Sean Hammon Photography';

    constructor(
        private store: Store<any>,
        private provider: GalleryProvider,
        private title: Title
    ) {
        //  Use skip to avoid state change events with the initial
        //  empty state.
        store.select(galleryState).skip(1)
            .subscribe(galleries => {
                let currentGallery = this.provider.fetchDefaultGallery();
                store.dispatch({
                    type: SET_CURRENT_GALLERY,
                    payload: currentGallery
                })
            });

    ngOnInit() {
        this.title.setTitle(this.pageTitle);
        this.store.dispatch({
            type: FETCH_GALLERIES
        });
    }
}
