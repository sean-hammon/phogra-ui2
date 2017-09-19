import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { currentGallery, loadComplete, thumbsState } from "../store/app.state";
import { Photo } from "../../phogra/photos/photo";
import { Gallery } from "../../phogra/galleries/gallery";
import { PRELOAD_COMPLETE } from '../store/app.actions';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.sass']
})
export class GalleryComponent implements OnInit{

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
    }

    public ngOnInit() {
        this.store.select(thumbsState)
            .subscribe(thumbs => this.thumbs = thumbs);
        this.store.select(loadComplete)
            .subscribe(() => this.thumbs_loaded = true);
        this.store.select(currentGallery)
            .subscribe((gallery) => this.gallery = gallery);

        this.store.dispatch({
            type: PRELOAD_COMPLETE
        });

    }

}
