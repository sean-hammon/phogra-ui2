import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {Photo} from './photo';
import { APPEND_THUMBS, RESET_THUMBS, SET_CURRENT_PHOTO, SET_PHOTOS } from '../../app/store/app.actions';

@Injectable()
export class PhotoProvider {

    public currentTag = '';
    public currentIndex = 0;

    private photos: Photo[];

    constructor(
        private store: Store<any>
    ) {}


    setPhotos (photos: Photo[]): void {

            this.photos = photos;
            this.store.dispatch({
                type: SET_PHOTOS,
                payload: photos
            });

    }


    fetch(index: number): Photo {

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

        const batch = this.limit(start, end);
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
}
