import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Gallery } from 'phogra/galleries/gallery';
import { GalleryProvider } from 'phogra/galleries/gallery.provider';
import {Store} from '@datorama/akita';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit, OnDestroy {

    @HostBinding('class.open')
    public get isOpen() {
        return this.menuOpen;
    }

    menuOpen: boolean;
    rootGalleries: Gallery[];

    constructor(
        private store: Store<any>,
        private router: Router,
        private galleries: GalleryProvider
    ) {
    }


    ngOnInit() {
    }


    ngOnDestroy () {
    }

}
