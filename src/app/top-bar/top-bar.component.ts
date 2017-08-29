import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/skip';
import { Store } from '@ngrx/store';
import { currentGallery, currentPhoto } from '../store/app.state';
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
    total_photos: number;

    constructor(
        private store: Store<any>,
        private router: Router
    ) {
        this.current_view = 'photo';
        this.total_photos = 0;

        store.select(currentPhoto).skip(1)
            .subscribe(photo => {
                if (this.current_view === 'photo') {
                    this.updateWithPhotoInfo(photo);
                }
            });
        store.select(currentGallery).skip(1)
            .subscribe(gallery => {
                if (this.current_view === 'gallery') {
                    this.updateWithGalleryInfo(gallery);
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

