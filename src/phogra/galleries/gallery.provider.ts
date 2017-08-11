import { Injectable } from "@angular/core";
import { GalleryService } from "./gallery.service";
import { Store } from "@ngrx/store";
import { Gallery } from "./gallery";

@Injectable()
export class GalleryProvider {

    private galleries = null;

    constructor (
        private store: Store<any>
    ) {
        store.select('appState')
            .subscribe(state => {
                this.galleries = state.galleries;
            });
    }


    fetchRootGalleries() {

        return this.galleries.filter((item: Gallery) => {
            return item.parent_id === null;
        });

    }


    fetchByParentId(parent_id: string) {

        return this.galleries.filter((item: Gallery) => {
            return item.parent_id === parent_id;
        });

    }
}
