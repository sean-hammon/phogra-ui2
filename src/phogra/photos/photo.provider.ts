import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {Photo} from './photo';
import { Gallery } from '../galleries/gallery';
import { APPEND_THUMBS, RESET_THUMBS, SET_CURRENT_PHOTO, SET_PHOTOS } from '../../app/store/app.actions';
import { currentGallery } from '../../app/store/app.state';

@Injectable()
export class PhotoProvider {

    public currentTag = '';
    public currentIndex = 0;
    private currentGallery: Gallery;

    private photos: Photo[];

    constructor(
        private store: Store<any>
    ) {
        store.select(currentGallery)
            .subscribe((gallery:Gallery) => this.currentGallery = gallery);
    }


    setPhotos (photos: Photo[]): void {

            this.photos = photos;
            this.store.dispatch({
                type: SET_PHOTOS,
                payload: photos
            });

    }


    fetch(index: number): Photo {

        const photo: Photo = this.photos[index];
        let previous: Photo = null;
        let next: Photo = null;

        if (index > 0) {
            previous = this.photos[index - 1];
            photo.links.previous = previous.links.ui;
        }
        if (index < this.photos.length - 1) {
            next = this.photos[index + 1];
            photo.links.next = next.links.ui;
        }

        this.updateLinks(photo);

        this.store.dispatch({
            type: SET_CURRENT_PHOTO,
            payload: this.photos[index]
        });

        return this.photos[index];

    }


    random(): Photo {

        this.currentIndex = Math.floor(Math.random() * this.photos.length);
        return this.fetch(this.currentIndex);

    }


    fetchById(photo_id: string): Photo {

        const index = this.photos.findIndex(item => item.id === photo_id);
        return this.fetch(index);

    }


    fetchThumbs(start, end): Photo[] {

        const batch = this.photos.slice(start, end);
        const action = start === 0 ? RESET_THUMBS : APPEND_THUMBS;

        this.store.dispatch({
            type: action,
            payload: batch
        });

        return batch;

    }


    limit(offset: number, length: number): Photo[] {
        return this.photos.slice(offset, offset + length);
    }


    private updateLinks(photo: Photo) {

        photo.links.ui = this.assembleLink(photo.links.ui, this.currentGallery.path);
        photo.links.previous = this.assembleLink(photo.links.previous, this.currentGallery.path);
        photo.links.next = this.assembleLink(photo.links.next, this.currentGallery.path);

    }


    private assembleLink(url, gallery_path): string {

        if (!url) {
            return url;
        }

        let parts = url.split('/');
        parts.splice(parts.length - 1, 0, "in");
        parts.splice(parts.length - 1, 0, gallery_path.substr(1));

        return parts.join('/');
    }
}
