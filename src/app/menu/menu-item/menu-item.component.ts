import { Component, Input, OnInit } from '@angular/core';
import { Gallery } from "../../../phogra/galleries/gallery";
import { GalleryProvider } from "../../../phogra/galleries/gallery.provider";

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
        this.gallery.links.ui = "/gallery/" + this.gallery.slug;
        this.gallery.path = '';
        if (this.parent) {
            this.gallery.links.ui += "/in" + this.parent.path;
            this.gallery.path = this.parent.path;
        }
        this.gallery.path += '/' + this.gallery.slug;
        this.gallery.links.ui += "/" + this.gallery.id;
        this.children = this.galleries.fetchByParentId(this.gallery.id);
    }

}
