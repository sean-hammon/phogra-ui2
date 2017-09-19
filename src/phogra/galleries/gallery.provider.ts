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
        this.generateGalleryPaths();
        this.store.dispatch({
            type: SET_GALLERIES,
            payload: this.galleries
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


    setDefaultGallery(): Gallery {
        const result =  this.galleries.filter((item: Gallery) => {
            return item.featured === 1;
        });

        this.setCurrent(result[0]);
        return result[0];
    }


    setById(id: string): Gallery {

        const gallery = this.fetchById(id);
        this.setCurrent(gallery);

        return gallery;

    }

    setBySlug(slug: string): Gallery {

        const gallery = this.fetchBySlug(slug);
        this.setCurrent(gallery);

        return gallery;

    }


    fetchById(id: string): Gallery {

        const result = this.galleries.filter((item: Gallery) => {
            return item.id === id;
        });

        return result[0];

    }


    fetchBySlug(slug: string): Gallery {

        const result = this.galleries.filter((item: Gallery) => {
            return item.slug === slug;
        });

        return result[0];

    }


    fetchByParentId(parent_id: string): Gallery[] {

        return this.galleries.filter((item: Gallery) => {
            return item.parent_id === parent_id;
        });

    }


    private generateGalleryPaths() {

        const rootGalleries = this.fetchRootGalleries();

        rootGalleries.forEach((gallery: Gallery) => {
            this.walkTree(gallery, null);
        });

    }


    private walkTree(gallery: Gallery, parent: Gallery){

        gallery.links.ui = '/gallery/' + gallery.slug;
        gallery.path = '';
        if (parent) {
            gallery.links.ui += '/in' + parent.path;
            gallery.path = parent.path;
        }
        gallery.path += '/' + gallery.slug;
        gallery.links.ui += '/' + gallery.id;

        if (gallery.relationships.children) {
            let children = this.fetchByParentId(gallery.id);
            children.forEach((child: Gallery) => {
                this.walkTree(child, gallery);
            })
        }
    }
}
