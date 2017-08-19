import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.sass']
})
export class GalleryComponent implements OnInit {

    @HostBinding('class')
    public get getClass() {
        return 'full-frame';
    }

    constructor() {
    }

    ngOnInit() {
    }

}
