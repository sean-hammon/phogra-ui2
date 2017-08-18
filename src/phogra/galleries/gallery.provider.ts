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


    fetchById(id: string): Gallery {

        let result = this.galleries.filter((item: Gallery) => {
            return item.id === id;
        });

        return result[0];

    }


    fetchByParentId(parent_id: string): Gallery {

        let result = this.galleries.filter((item: Gallery) => {
            return item.parent_id === parent_id;
        });

        return result[0];

    }
}
