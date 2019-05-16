import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Photo } from 'phogra/photos/photo';
import { Gallery } from 'phogra/galleries/gallery';
import { ThumbCalculator } from './thumb/ThumbCalculator';
import {Store} from '@datorama/akita';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.sass']
})
export class GalleryComponent implements OnInit, OnDestroy {

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
        private calculator: ThumbCalculator
    ) {

        this.thumbs_loaded = false;
        this.current_page_size = this.calculator.getPageSize();
        this.gallery_stats = null;
        this.subscriptions = {
            thumbState: null,
            loadComplete: null,
            currentGallery: null,
            thumbPages: null,
            photo_count: null,
            thumbs: null
        };

    }

    public ngOnInit() {
    }


    public ngOnDestroy() {
    }


    public loadNextBatch() {
    }


    public updateLoadMore() {

        this.show_load_more = this.gallery_stats.thumb_count !== this.gallery_stats.photo_count;
        const remain_to_load = this.gallery_stats.photo_count - this.gallery_stats.thumb_count;
        this.next_page_size = this.current_page_size > remain_to_load
            ? remain_to_load
            : this.current_page_size;

    }

}
