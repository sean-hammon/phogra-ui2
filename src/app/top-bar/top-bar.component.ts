import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import { Photo } from '../../phogra/photos/photo';
import { Gallery } from '../../phogra/galleries/gallery';
import {
    currentGallery, currentPhoto, initialStats, photoCount,
    thumbCount, zoomState
} from '../store/app.state';
import { TOGGLE_ZOOM } from '../store/app.actions';
import 'rxjs/add/operator/filter';
import { Location } from '@angular/common';
import { GalleryProvider } from '../../phogra/galleries/gallery.provider';
import { PhotoProvider } from '../../phogra/photos/photo.provider';
import 'rxjs/add/operator/distinctUntilChanged';

interface IZoomIcons {
    cover: string,
    fit: string
}

@Component({
    selector: 'app-topbar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit, OnDestroy {

    page_title: string;
    description: string;
    previous_link: string;
    next_link: string;
    current_view: string;
    gallery_stats: any;
    zoom_state: string;
    zoom_icons: IZoomIcons;
    subscriptions: any;

    constructor(
        private store: Store<any>,
        private router: Router,
        private location: Location,
        private galleries: GalleryProvider,
        private photos: PhotoProvider
    ) {
        this.current_view = 'photo';
        this.gallery_stats = initialStats;
        this.zoom_state = 'cover';
        this.zoom_icons = {
            cover: '/static/zoom_out_1x.png',
            fit: '/static/zoom_in_1x.png',
        };
        this.subscriptions = {
            nav_start: null,
            current_photo: null,
            current_gallery: null,
            zoom_state: null,
            photo_count: null,
            thumb_count: null
        };

    }


    ngOnInit() {

        //  Handle the back button and make sure state is updated.
        this.location.subscribe(evt => {
            if (evt.pop) {
                const obj_id = evt.url.split('/').pop();
                if (evt.url.indexOf('gallery') === 1) {

                    this.current_view = 'gallery';

                    //  If the gallery hasn't actually changed app state
                    //  won't emit a new value. Do some manual work for
                    //  the moment...

                    const gallery = this.galleries.fetchById(obj_id);
                    this.updateWithGalleryInfo(gallery);
                    this.galleries.setCurrent(gallery);

                } else {

                    this.current_view = 'photo';
                    this.photos.fetchById(obj_id);

                }
            }
        });

        this.subscriptions.nav_start = this.router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((event: NavigationStart) => {
                this.description = '';
            });

        this.subscriptions.current_gallery = this.store.select(currentGallery)
            .subscribe(gallery => {
                if (typeof gallery.slug !== 'undefined') {
                    this.current_view = 'gallery';
                    this.updateWithGalleryInfo(gallery);
                }
            });

        this.subscriptions.current_photo = this.store.select(currentPhoto)
            .subscribe(photo => {
                if (typeof photo.slug !== 'undefined') {
                    this.current_view = 'photo';
                    this.updateWithPhotoInfo(photo);
                }
            });

        this.subscriptions.photo_count = this.store.select(photoCount)
            .subscribe(count => {
                this.gallery_stats.photo_count = count;
                this.updateGalleryDescription();
            });

        this.subscriptions.thumb_count = this.store.select(thumbCount)
            .subscribe(count => {
                this.gallery_stats.thumb_count = count;
                this.updateGalleryDescription();
            });

        this.subscriptions.zoom_state = this.store.select(zoomState)
            .subscribe(zoom_state => this.zoom_state = zoom_state);
    }


    ngOnDestroy() {

        this.subscriptions.nav_start.unsubscribe();
        this.subscriptions.current_photo.unsubscribe();
        this.subscriptions.current_gallery.unsubscribe();
        this.subscriptions.photo_count.unsubscribe();
        this.subscriptions.thumb_count.unsubscribe();
        this.subscriptions.zoom_state.unsubscribe();

    }


    updateWithPhotoInfo(photo: Photo) {
        this.page_title = photo.title;
        this.description = photo.short_desc;
        this.previous_link = photo.links.previous;
        this.next_link = photo.links.next;
    }


    updateWithGalleryInfo(gallery: Gallery) {
        this.previous_link = null;
        this.next_link = null;
        this.page_title = gallery.title;
    }


    updateGalleryDescription() {

        if (
            this.current_view === 'gallery'
            && this.gallery_stats.photo_count > 0
            && this.gallery_stats.thumb_count > 0
        ) {
            this.description = `${this.gallery_stats.thumb_count} of ${this.gallery_stats.photo_count} photos displayed.`;
        }

    }


    toggleZoom() {
        this.store.dispatch({
            type: TOGGLE_ZOOM
        });
    }

}

