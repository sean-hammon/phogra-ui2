import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
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
export class GalleryComponent implements OnInit, OnDestroy{

    gallery: Gallery;
    thumbs: Photo[];
    thumbs_loaded: boolean;
    current_page: number;
    next_page_size: number;
    subscriptions: any;

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
        this.subscriptions = {
            thumbState: null,
            loadComplete: null,
            currentGallery: null
        };
    }

    public ngOnInit() {
        this.subscriptions.thumbState = this.store.select(thumbsState)
            .subscribe(thumbs => this.thumbs = thumbs);
        this.subscriptions.loadComplete = this.store.select(loadComplete)
            .subscribe(() => this.thumbs_loaded = true);
        this.subscriptions.currentGallery = this.store.select(currentGallery)
            .subscribe((gallery) => this.gallery = gallery);

        this.store.dispatch({
            type: PRELOAD_COMPLETE
        });

    }


    public ngOnDestroy() {
        this.subscriptions.thumbState.unsubscribe();
        this.subscriptions.loadComplete.unsubscribe();
        this.subscriptions.currentGallery.unsubscribe();
    }


    public loadNextBatch() {

        this.current_page++;
        this.ThumbCalculator.fetchSinglePage(this.current_page);

    }

}
