import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Gallery } from '../../phogra/galleries/gallery';
import { Photo } from '../../phogra/photos/photo';
import { GalleryProvider } from '../gallery/gallery.provider';
import { PhotoProvider } from '../photo/photo.provider';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.sass']
})
export class TopbarComponent implements OnInit {

    public onDisplay$: BehaviorSubject<Gallery|Photo>;

    constructor(
        private galleries: GalleryProvider,
        private photos: PhotoProvider,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.activatedRoute.url.subscribe((segments) => {
            console.log(segments[0].path);
            switch(segments[0].path) {

                case 'gallery':
                    this.onDisplay$ = this.galleries.currentGallery();
                    break;

                case '':
                case 'photo':
                    this.onDisplay$ = this.photos.currentPhoto();
                    break;

                default:
                    console.log('boom');
            }
        });
    }

}
