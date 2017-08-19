import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Gallery } from './gallery';
import { SET_CURRENT_GALLERY, SET_GALLERIES } from '../../app/store/app.actions';

@Injectable()
export class GalleryProvider {

    private galleries = null;

    constructor (
        private store: Store<any>
    ) { }


    setGalleries (galleries) {

        this.galleries = galleries;
        this.store.dispatch({
            type: SET_GALLERIES,
            payload: galleries
        });

    }


    setCurrent (gallery: Gallery): void {

        this.store.dispatch({
            type: SET_CURRENT_GALLERY,
            payload: gallery
        });

    }


    fetchRootGalleries() {

        return this.galleries.filter((item: Gallery) => {
            return item.parent_id === null;
        });

    }


    fetchDefaultGallery(): Gallery {
        const result =  this.galleries.filter((item: Gallery) => {
            return item.featured === 1;
        });

        this.setCurrent(result[0]);
        return result[0];
    }


    fetchById(id: string): Gallery {

        const result = this.galleries.filter((item: Gallery) => {
            return item.id === id;
        });

        this.setCurrent(result[0]);
        return result[0];

    }


    fetchByParentId(parent_id: string): Gallery[] {

        return this.galleries.filter((item: Gallery) => {
            return item.parent_id === parent_id;
        });

    }
}
