import { Component, Input, OnInit } from '@angular/core';
import { Gallery } from '../../../phogra/galleries/gallery';
import { GalleryProvider } from '../../../phogra/galleries/gallery.provider';

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.sass']
})
export class MenuItemComponent implements OnInit {

    @Input()
        gallery: Gallery;
    @Input()
        parent: Gallery;

    children: Gallery[];

    constructor(
        private galleries: GalleryProvider
    ) { }

    ngOnInit() {
        this.children = this.galleries.fetchByParentId(this.gallery.id);
    }

}
