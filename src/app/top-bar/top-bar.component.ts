import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Store } from '@ngrx/store';
import { currentGallery, currentPhoto, initialStats, topBarStats } from '../store/app.state';
import { Photo } from "../../phogra/photos/photo";
import { Gallery } from "../../phogra/galleries/gallery";

@Component({
    selector: 'app-topbar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit {

    page_title: string;
    description: string;
    current_view: string;
    gallery_stats: any;

    constructor(
        private store: Store<any>,
        private router: Router
    ) {
        this.current_view = 'photo';
        this.gallery_stats = initialStats;

        store.select(currentPhoto)
            .subscribe(photo => {
                if (this.current_view === 'photo') {
                    this.updateWithPhotoInfo(photo);
                }
            });
        store.select(currentGallery)
            .subscribe(gallery => {
                if (this.current_view === 'gallery') {
                    this.updateWithGalleryInfo(gallery);
                }
            });
        store.select(topBarStats)
            .subscribe(stats => {
                if (this.current_view === 'gallery' && stats.photo_count > 0 && stats.thumb_count > 0) {
                    this.description = `${stats.thumb_count} of ${stats.photo_count} photos displayed.`;
                }
            });

    }


    ngOnInit() {
        this.router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((event: NavigationStart) => {
                this.current_view = event.url.split('/')[1] || 'photo';
                this.page_title = '';
                this.description = '';
            });
    }


    updateWithPhotoInfo(photo: Photo) {
        this.page_title = photo.title;
        this.description = photo.short_desc;
    }


    updateWithGalleryInfo(gallery: Gallery) {
        this.page_title = gallery.title;
    }

}

