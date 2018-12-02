import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Gallery } from '../../phogra/galleries/gallery';
import { GalleryService } from '../../phogra/galleries/gallery.service';

@Injectable()
export class GalleryProvider {

    private galleries = null;
    private _currentGallery$ = new BehaviorSubject<Gallery>(null);

    constructor (
        private galleryApi: GalleryService
    ) {
        this.galleryApi.fetchGalleries()
            .subscribe((galleries) => {
                this.galleries = galleries;
                this.generateGalleryPaths();
                this.setDefaultGallery();
            });
    }

    currentGallery() {
        return this._currentGallery$;
    }


    setCurrent (gallery: Gallery): void {
        this._currentGallery$.next(gallery);
    }


    fetchRootGalleries() {

        return this.galleries.filter((item: Gallery) => {
            return item.parent_id === null;
        });

    }


    setDefaultGallery(): Gallery {
        const featured =  this.galleries.filter((item: Gallery) => {
            return item.featured === 1;
        });

        if (featured.length > 0) {
            this.setCurrent(featured[0]);
            return featured[0];
        } else {
            const random = this.randomGallery();
            this.setCurrent(random);
            return random;
        }

    }

    randomGallery(): Gallery {

        const rnd = Math.floor(Math.random() * this.galleries.length);
        return this.fetchByIndex(rnd);

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


    fetchByIndex(idx: number): Gallery {

        return this.galleries[idx];

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
