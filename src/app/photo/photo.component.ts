import {Component, HostBinding, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { currentPhoto, loadComplete } from '../store/app.state';
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
    visible: boolean;
    inlineStyles: SafeStyle;
    zoomState: string;

    private winH: number;
    private winW: number;
    private viewH: number;

    constructor(
        private store: Store<any>,
        private sanitzer: DomSanitizer
    ) {
        this.visible = false;
    }

    ngOnInit() {
        this.winH = document.documentElement.clientHeight;
        this.winW = document.documentElement.clientWidth;
        // this.viewH = this.winH - this.menuH - (this.thumbGutter * 2);

        this.store.select(currentPhoto)
            .subscribe(photo => this.photo = photo);

        this.store.select(loadComplete)
            .subscribe(() => this.coverScreen());

    }


    coverScreen() {

        let imgH, imgW, imgRatio, viewRatio, top, left;
        //  This will be dynamic later
        const size = 'hifi';

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

        const styles = [
            'background-image:' + this.photo.files[size].cssUrl(),
            `height:${imgH}px`,
            `width:${imgW}px`,
            `top:${top}px`,
            `left:${left}px`,
        ];

        this.inlineStyles =  this.sanitzer.bypassSecurityTrustStyle(styles.join(';'));
        this.zoomState = 'cover';

        //  This feels really hacky, but lifecycle hooks and the animation
        //  module don't wait for the component to be fully initialized in
        //  in the DOM before running the animations. As far as I can tell, router
        //  animations only work on host elements paired with router-outlet.
        //  That won't work here. Not sure how I would implement a cross fade
        //  based on routing.

        setTimeout(() => {
            this.visible = true;
        }, 500);

    }

}
