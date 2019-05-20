import { Injectable } from '@angular/core';
import { PhotoProvider } from 'phogra/photos/photo.provider';
import { Photo } from 'phogra/photos/photo';
import { PhotoService } from 'phogra/photos/photo.service';
import { Observable } from 'rxjs';

@Injectable()
export class ThumbCalculator {

    private thumb_size: number;

    constructor (
        private photos: PhotoProvider,
        private photoApi: PhotoService
    ) {
        // img_width + borders + padding + right_margin
        this.thumb_size = 320 + 4 + 14 + 16;
    }


    public getPageSize(): number {
        return this.calcPageSize();
    }


    public fetchSinglePage(page_num: number): Observable<Photo[]> {

        const page_size = this.calcPageSize();
        let start = (page_size * page_num) - 1;
        if (start < 0) {
            start = 0;
        }
        let end = start + page_size;
        if (start === 0) {
            end -= 1;
        }

        const batch = this.photos.fetchThumbs(start, end);
        return this.photoApi.preloadThumbs(batch);
    }


    public fetchPageRange(start_page: number, end_page: number): Observable<Photo[]> {

        if (start_page === end_page) {
            return this.fetchSinglePage(start_page);
        }

        const page_size = this.calcPageSize();
        let start = (page_size * start_page) - 1;
        if (start < 0) {
            start = 0;
        }
        //  Increment end_page before hand to account for zero index
        const end = start + (++end_page * page_size) - 1;

        const batch = this.photos.fetchThumbs(start, end);
        return this.photoApi.preloadThumbs(batch);

    }


    private calcPageSize(): number {

        const winH = document.documentElement.clientHeight;
        const winW = document.documentElement.clientWidth;
        const rows = Math.floor(winH / this.thumb_size);
        const cols = Math.floor(winW / this.thumb_size);

        let page_size = rows * cols;
        if (page_size < 3) {
            page_size = 3;
        }

        return page_size;

    }

}
