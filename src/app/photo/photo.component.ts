import {Component, HostBinding, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { currentPhoto } from '../store/app.state';
import { Photo } from '../../phogra/photos/photo';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.sass']
})
export class PhotoComponent implements OnInit {

    @HostBinding('class')
    public get getClass() {
        return 'full-frame';
    }

    photo: Photo;
    inlineStyles: SafeStyle;
    zoomState: string;

    private winH: number;
    private winW: number;
    private viewH: number;

    constructor(
        private store: Store<any>,
        private sanitzer: DomSanitizer
    ) {
        store.select(currentPhoto).skip(1)
            .subscribe(photo => {
                console.log(photo);
                this.photo = photo;
                this.coverScreen();
            });
    }

    ngOnInit() {
        this.winH = document.documentElement.clientHeight;
        this.winW = document.documentElement.clientWidth;
        // this.viewH = this.winH - this.menuH - (this.thumbGutter * 2);
    }


    coverScreen() {

        let imgH, imgW, imgRatio, viewRatio, top, left;
        //  This will be dynamic later
        let size = 'hifi';

        imgH = this.photo.files[size].height;
        imgW = this.photo.files[size].width;

        imgRatio = imgW / imgH;
        viewRatio = this.winW / this.winH;

        if (imgRatio > viewRatio) {

            //  Screen is longer than the photo, relative to the height.
            imgH = this.winH;
            imgW = Math.round(this.winH * imgRatio);

        } else {

            imgW = this.winW;
            imgH = Math.round(this.winW / imgRatio);

        }

        top = Math.round((this.winH - imgH) / 2);
        left = Math.round((this.winW - imgW) / 2);

        //  Landscape
        if ( viewRatio > 1 && this.photo.files[size].top != null) {
            top = -1 * this.photo.files[size].top;
        }

        //  Portrait
        if (viewRatio < 1 && this.photo.files[size].left != null) {
            left = -1 * this.photo.files[size].left;
        }

        var styles = [
            'background-image:' + this.photo.files[size].cssUrl(),
            `height:${imgH}px`,
            `width:${imgW}px`,
            `top:${top}px`,
            `left:${left}px`,
        ];

        this.inlineStyles =  this.sanitzer.bypassSecurityTrustStyle(styles.join(';'));
        this.zoomState = 'cover';

    }

}
