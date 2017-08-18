import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import {Photo} from "./photo";
import { SET_CURRENT_PHOTO, SET_PHOTOS } from "../../app/store/app.actions";

@Injectable()
export class PhotoProvider {

    public currentTag: string;
    public currentIndex: number = 0;

    private photos: Photo[];

    constructor(
        private store: Store<any>
    ){}


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

}
