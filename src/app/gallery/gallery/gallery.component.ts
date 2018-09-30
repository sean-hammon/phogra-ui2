import { Component, OnInit } from '@angular/core';
import { Gallery } from '../../../phogra/galleries/gallery';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.sass']
})
export class GalleryComponent implements OnInit {

    gallery: Gallery;
    children: Gallery[];

    constructor() {}

    ngOnInit() {
        this.gallery = {
            id: 'xyz',
            parent_id: 'foo',
            title: '__root',
            node: '',
            slug: '__root',
            featured: 0,
            restricted: false,
            links: {
                self: '',
                photos: '',
                children: '',
                ui: ''
            },
            relationships: {
                children: []
            },
            created_at: null,
            updated_at: null
        };

        this.children = [
            {
                id: 'xyz',
                parent_id: 'foo',
                title: 'Travel',
                node: '',
                slug: '__root',
                featured: 0,
                thumb: 'http://phogra.sean-hammon.com/photos/mBAMoB/image/thumb',
                restricted: false,
                links: {
                    self: '',
                    photos: '',
                    children: '',
                    ui: ''
                },
                relationships: {
                    children: []
                },
                created_at: null,
                updated_at: null
            },
            {
                id: 'xyz',
                parent_id: 'foo',
                title: 'Sport',
                node: '',
                slug: '__root',
                featured: 0,
                thumb: 'http://phogra.sean-hammon.com/photos/Vpv2Wp/image/thumb',
                restricted: false,
                links: {
                    self: '',
                    photos: '',
                    children: '',
                    ui: ''
                },
                relationships: {
                    children: []
                },
                created_at: null,
                updated_at: null
            }
        ];
    }

}
