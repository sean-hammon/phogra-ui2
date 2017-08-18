import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import {Photo} from "./photo";
import { photosState } from "../../app/store/app.state";

@Injectable()
export class PhotoProvider {

    public currentTag: string;
    public currentIndex: number = 0;
    public currentPhoto: Photo;

    private photos: Photo[];

    constructor(
        private store: Store<any>
    ){
        store.select(photosState)
            .subscribe(photos => { this.photos = photos });
    }


    fetch(index: number): Photo {

        return this.photos[index];

    }


    random(): Photo {

        this.currentIndex = Math.floor(Math.random() * this.photos.length);
        return this.fetch(this.currentIndex);

    }

}
