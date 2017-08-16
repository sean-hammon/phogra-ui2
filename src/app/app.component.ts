import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from "@ngrx/store";
import { currentGallery, galleryState, photosState } from "./store/app.state";
import { FETCH_GALLERIES, SET_CURRENT_GALLERY, FETCH_GALLERY_PHOTOS, SET_CURRENT_PHOTO } from "./store/app.actions";
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

        store.select(currentGallery).skip(1)
            .subscribe(gallery => {
                store.dispatch({
                    type: FETCH_GALLERY_PHOTOS,
                    payload: gallery
                })
            });

        store.select(photosState).skip(1)
            .subscribe(photos => {
                let currentPhoto = photos[0];
                store.dispatch({
                    type: SET_CURRENT_PHOTO,
                    payload: currentPhoto
                })
            });
    }

    ngOnInit() {
        this.title.setTitle(this.pageTitle);
        this.store.dispatch({
            type: FETCH_GALLERIES
        });
    }
}
