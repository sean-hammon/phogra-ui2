import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.sass'],
    host: {
        'class': 'full-frame'
    }
})
export class GalleryComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
