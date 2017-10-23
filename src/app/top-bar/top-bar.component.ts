import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import { Photo } from '../../phogra/photos/photo';
import { Gallery } from '../../phogra/galleries/gallery';
import { currentGallery, currentPhoto, initialStats, topBarStats, zoomState } from '../store/app.state';
import { TOGGLE_ZOOM } from '../store/app.actions';
import 'rxjs/add/operator/filter';

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
        private router: Router
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
            top_bar_stats: null,
            zoom_state: null
        };

    }


    ngOnInit() {
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

        this.subscriptions.top_bar_stats = this.store.select(topBarStats)
            .subscribe(stats => {
                if (this.current_view === 'gallery' && stats.photo_count > 0 && stats.thumb_count > 0) {
                    this.description = `${stats.thumb_count} of ${stats.photo_count} photos displayed.`;
                }
            });

        this.subscriptions.zoom_state = this.store.select(zoomState)
            .subscribe(zoom_state => this.zoom_state = zoom_state);
    }


    ngOnDestroy() {

        this.subscriptions.nav_start.unsubscribe();
        this.subscriptions.current_photo.unsubscribe();
        this.subscriptions.current_gallery.unsubscribe();
        this.subscriptions.top_bar_stats.unsubscribe();
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


    toggleZoom() {
        this.store.dispatch({
            type: TOGGLE_ZOOM
        });
    }

}

