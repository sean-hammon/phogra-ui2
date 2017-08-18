import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { galleryState, menuState } from "../store/app.state";
import { Gallery } from "../../phogra/galleries/gallery";
import { GalleryProvider } from "../../phogra/galleries/gallery.provider";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.sass'],
    host: {
        '[class.open]': 'menuOpen'
    }
})
export class MenuComponent {

    menuOpen: boolean;
    rootGalleries: Gallery[];

    constructor(
        private store: Store<any>,
        private galleries: GalleryProvider
    )
    {
        store.select(menuState)
            .subscribe(open => {
                this.menuOpen = open;
            });
        store.select(galleryState).skip(1)
            .subscribe(galleries => {
                this.rootGalleries = this.galleries.fetchRootGalleries();
            })
    }

}
