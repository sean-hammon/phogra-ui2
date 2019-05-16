import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationStart } from '@angular/router';

import { Photo } from 'phogra/photos/photo';
import { Gallery } from 'phogra/galleries/gallery';
import { GalleryProvider } from 'phogra/galleries/gallery.provider';
import { PhotoProvider } from 'phogra/photos/photo.provider';

import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {SessionQuery} from 'app/store/session.query';

interface IZoomIcons {
    cover: string;
    fit: string;
}

@Component({
    selector: 'app-topbar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit, OnDestroy {

    unsubscribe$: Subject<boolean>;

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
        private session: SessionQuery,
        private router: Router,
        private location: Location,
        private galleries: GalleryProvider,
        private photos: PhotoProvider
    ) {
        this.current_view = 'photo';
        this.gallery_stats = null;
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

        this.unsubscribe$ = new Subject<boolean>();

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

        this.router.events
            .pipe(
                filter(event => event instanceof NavigationStart),
                takeUntil(this.unsubscribe$)
            ).subscribe((event: NavigationStart) => {
                this.description = '';
            });

        this.session.currentGallery$
            .subscribe(gallery => {
                if (typeof gallery.slug !== 'undefined') {
                    this.current_view = 'gallery';
                    this.updateWithGalleryInfo(gallery);
                }
            });

        this.session.currentPhoto$
            .subscribe(photo => {
                if (typeof photo.slug !== 'undefined') {
                    this.current_view = 'photo';
                    this.updateWithPhotoInfo(photo);
                }
            });

        this.session.photoCount$
            .subscribe(count => {
                this.gallery_stats.photo_count = count;
                this.updateGalleryDescription();
            });

        this.session.thumbCount$
            .subscribe(count => {
                this.gallery_stats.thumb_count = count;
                this.updateGalleryDescription();
            });

        this.session.zoomState$
            .subscribe(zoom_state => this.zoom_state = zoom_state);
    }


    ngOnDestroy() {
        this.unsubscribe$.next(true);
        this.unsubscribe$.complete();
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
    }

}

