import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { currentGallery, loadComplete, thumbsState } from "../store/app.state";
import { Photo } from "../../phogra/photos/photo";
import { Gallery } from "../../phogra/galleries/gallery";
import { PRELOAD_COMPLETE } from '../store/app.actions';
import { ThumbCalculator } from './thumb/ThumbCalculator';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.sass']
})
export class GalleryComponent implements OnInit{

    gallery: Gallery;
    thumbs: Photo[];
    thumbs_loaded: boolean;
    current_page: number;
    next_page_size: number;

    @HostBinding('class')
    public get getClass() {
        return 'full-frame';
    }

    constructor(
        private store: Store<any>,
        private ThumbCalculator: ThumbCalculator
    ) {
        this.current_page = 0;
        this.thumbs_loaded = false;
        this.next_page_size = this.ThumbCalculator.getPageSize();
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


    public loadNextBatch() {

        this.current_page++;
        this.ThumbCalculator.fetchSinglePage(this.current_page);

    }

}
