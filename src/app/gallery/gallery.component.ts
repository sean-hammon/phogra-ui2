import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import {
    currentGallery, initialStats, loadComplete, photoCount, thumbCount, thumbPages,
    thumbsState
} from "../store/app.state";
import { Photo } from "../../phogra/photos/photo";
import { Gallery } from "../../phogra/galleries/gallery";
import { PRELOAD_COMPLETE, ThumbsIncrementPage } from '../store/app.actions';
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
    show_load_more: boolean;
    current_page_size: number;
    next_page_size: number;
    subscriptions: any;
    gallery_stats: any;

    @HostBinding('class')
    public get getClass() {
        return 'full-frame';
    }

    constructor(
        private store: Store<any>,
        private ThumbCalculator: ThumbCalculator
    ) {

        this.thumbs_loaded = false;
        this.current_page_size = this.ThumbCalculator.getPageSize();
        this.gallery_stats = initialStats;
        this.subscriptions = {
            thumbState: null,
            loadComplete: null,
            currentGallery: null,
            thumbPages: null,
            photo_count: null,
            thumb_count: null
        };

    }

    public ngOnInit() {

        this.subscriptions.thumbState = this.store.select(thumbsState)
            .subscribe(thumbs => this.thumbs = thumbs);
        this.subscriptions.loadComplete = this.store.select(loadComplete)
            .subscribe(() => this.thumbs_loaded = true);
        this.subscriptions.currentGallery = this.store.select(currentGallery)
            .subscribe((gallery) => this.gallery = gallery);
        this.subscriptions.thumbPages = this.store.select(thumbPages)
            //  Skip initial load of thumbs. We only care about
            // interactions on this page.
            .skip(1)
            .subscribe((thumb_pages) => {
                console.log('thumb_pages', thumb_pages);
                const current_page = thumb_pages[this.gallery.id];
                this.ThumbCalculator.fetchSinglePage(current_page);
            });
        this.subscriptions.photo_count = this.store.select(photoCount)
            .subscribe(count => {
                console.log("photo_count", count);
                this.gallery_stats.photo_count = count;
                this.updateLoadMore();
            });
        this.subscriptions.thumb_count = this.store.select(thumbCount)
            .subscribe(count => {
                console.log("thumb_count", count);
                this.gallery_stats.thumb_count = count;
                this.updateLoadMore();
            });

        this.store.dispatch({
            type: PRELOAD_COMPLETE
        });

    }


    public ngOnDestroy() {
        this.subscriptions.thumbState.unsubscribe();
        this.subscriptions.loadComplete.unsubscribe();
        this.subscriptions.currentGallery.unsubscribe();
        this.subscriptions.thumbPages.unsubscribe();
        this.subscriptions.photo_count.unsubscribe();
        this.subscriptions.thumb_count.unsubscribe();
    }


    public loadNextBatch() {

        this.store.dispatch(new ThumbsIncrementPage(this.gallery.id));

    }


    public updateLoadMore() {

        this.show_load_more = this.gallery_stats.thumb_count !== this.gallery_stats.photo_count;
        const remain_to_load = this.gallery_stats.photo_count - this.gallery_stats.thumb_count;
        this.next_page_size = this.current_page_size > remain_to_load
            ? remain_to_load
            : this.current_page_size;

    }

}
