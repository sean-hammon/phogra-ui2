import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Gallery } from '../../phogra/galleries/gallery';
import { Photo } from '../../phogra/photos/photo';
import { GalleryProvider } from '../gallery/gallery.provider';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.sass']
})
export class TopbarComponent implements OnInit {

    public onDisplay$: Observable<Gallery|Photo>;

    constructor(
        private galleries: GalleryProvider,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.activatedRoute.url.subscribe((segments) => {
            console.log(segments[0].path);
            if (segments[0].path == '' || segments[0].path == 'gallery') {
                this.onDisplay$ = this.galleries.currentGallery();
            }
        });
    }

}
