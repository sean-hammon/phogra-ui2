import { Injectable } from '@angular/core';
import { PhotoProvider } from '../../../phogra/photos/photo.provider';
import { Photo } from '../../../phogra/photos/photo';

@Injectable()
export class ThumbCalculator {

    private thumb_size: number;

    constructor (
        private photos: PhotoProvider
    ) {
        // img_width + borders + padding + right_margin
        this.thumb_size = 320 + 4 + 14 + 16;
    }


    public getPageSize(): number {
        return this.calcPageSize();
    }


    public fetchSinglePage(page_num: number): Photo[] {

        const page_size = this.calcPageSize();
        let start = page_size * page_num - 1;
        if (start < 0) {
            start = 0;
        }
        const end = start + page_size - 1;

        return this.photos.fetchThumbs(start, end);
    }


    public fetchPageRange(start_page: number, end_page: number): Photo[] {

        const page_size = this.calcPageSize();
        let start = page_size * start_page - 1;
        if (start < 0) {
            start = 0;
        }
        const end = start + (end_page * page_size) - 1;

        return this.photos.fetchThumbs(start, end);

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
