import {Component, HostBinding, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { currentPhoto, loadComplete } from '../store/app.state';
import { Photo } from '../../phogra/photos/photo';
import { File } from '../../phogra/photos/file';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { PRELOAD_COMPLETE } from '../store/app.actions';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

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
    private file: File;

    constructor(
        private store: Store<any>,
        private sanitzer: DomSanitizer,
        private router: Router

    ) {
        this.visible = false;
    }

    ngOnInit() {
        this.winH = document.documentElement.clientHeight;
        this.winW = document.documentElement.clientWidth;
        // this.viewH = this.winH - this.menuH - (this.thumbGutter * 2);

        this.store.select(currentPhoto)
            .subscribe(photo => {
                this.photo = photo;
                //  File size will be dynamic later
                if (typeof this.photo.files['hifi'] !== 'undefined') {
                    this.file = this.photo.files['hifi'];
                }
            });

        this.store.select(loadComplete)
            .subscribe((completeIsTrue) => {
                if (completeIsTrue) {
                    this.coverScreen()
                }
            });

        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((event: NavigationEnd) => {

                this.store.dispatch({
                    type: PRELOAD_COMPLETE
                });

            });

        this.router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((event: NavigationStart) => {

                this.visible = false;

            });

        this.store.dispatch({
            type: PRELOAD_COMPLETE
        });
    }


    coverScreen() {
        let imgH, imgW, imgRatio, viewRatio, top, left, css_pointer, css_offset;

        imgH = this.file.height;
        imgW = this.file.width;

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

        let styles = [
            'background-image:' + this.file.cssUrl(),
            `height:${imgH}px`,
            `width:${imgW}px`,
        ];
        //  Landscape
        if ( imgRatio <= 1 ) {

            top = Math.round((this.winH - imgH) / 2);
            if (this.file.offset != null) {
                top =  -(imgH * this.file.offset / 100);
                if (top < this.winH - imgH) {
                    top = this.winH - imgH;
                }
            }

            css_offset = `top: ${top}px`;
            css_pointer = 'cursor: ns-resize';
        }

        //  Portrait
        if (imgRatio > 1 ) {

            left = Math.round((this.winW - imgW) / 2);
            if (this.file.offset != null) {
                left =  -(imgW * this.file.offset / 100);
                if (left > this.winW - imgW) {
                    left = this.winW - imgW;
                }
            }

            css_offset = `left: ${left}px`;
            css_pointer = 'cursor: ew-resize';

        }

        styles.push(css_offset);
        styles.push(css_pointer);
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
