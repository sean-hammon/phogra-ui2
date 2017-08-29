import {Component, HostBinding } from '@angular/core';
import { Store } from "@ngrx/store";
import { currentGallery, loadComplete, thumbsState } from "../store/app.state";
import { Photo } from "../../phogra/photos/photo";
import { Gallery } from "../../phogra/galleries/gallery";

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.sass']
})
export class GalleryComponent {

    gallery: Gallery;
    thumbs: Photo[];
    thumbs_loaded: boolean;

    @HostBinding('class')
    public get getClass() {
        return 'full-frame';
    }

    constructor(
        private store: Store<any>
    ) {
        this.thumbs_loaded = false;
        store.select(thumbsState)
            .subscribe(thumbs => this.thumbs = thumbs);
        store.select(loadComplete)
            .subscribe(() => this.thumbs_loaded = true);
        store.select(currentGallery)
            .subscribe((gallery) => this.gallery = gallery);
    }

}
