import { Injectable } from "@angular/core";
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


    fetchDefaultGallery(): Gallery {
        let result =  this.galleries.filter((item: Gallery) => {
            return item.featured === 1;
        });

        return result[0];
    }


    fetchById(id: string) {

        return this.galleries.filter((item: Gallery) => {
            return item.id === id;
        });

    }


    fetchByParentId(parent_id: string) {

        return this.galleries.filter((item: Gallery) => {
            return item.parent_id === parent_id;
        });

    }
}
