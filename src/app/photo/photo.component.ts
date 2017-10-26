import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { currentPhoto, loadComplete, zoomState } from '../store/app.state';
import { Photo } from '../../phogra/photos/photo';
import { File } from '../../phogra/photos/file';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { AppPreloadCompleteAction, PhotosToggleZoom } from '../store/app.actions';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import 'rxjs/add/operator/skip';
import { ConstrainedDrag } from 'app/photo/ConstrainedDrag';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.sass']
})
export class PhotoComponent implements OnInit, OnDestroy {

    @HostBinding('class')
    public get getClass() {
        return 'full-frame';
    }

    photo: Photo;
    visible: boolean;
    inlineStyles: SafeStyle;

    private mouseTimeout: any;
    private isDragging: boolean;
    private winH: number;
    private winW: number;
    private viewH: number;
    private file: File;
    private subscriptions: any;

    constructor(
        private store: Store<any>,
        private sanitzer: DomSanitizer,
        private router: Router,
        private DragManager: ConstrainedDrag
    ) {
        this.visible = false;
        this.isDragging = false;
        this.subscriptions = {
            current_photo: null,
            load_complete: null,
            zoom_state: null,
            nav_start: null,
            nav_end: null
        };
    }

    ngOnInit() {
        this.winH = document.documentElement.clientHeight;
        this.winW = document.documentElement.clientWidth;

        this.subscriptions.current_photo = this.store.select(currentPhoto)
            .subscribe(photo => {
                this.photo = photo;
                //  File size will be dynamic later
                if (typeof this.photo.files['hifi'] !== 'undefined') {
                    this.file = this.photo.files['hifi'];
                }
            });

        this.subscriptions.load_complete = this.store.select(loadComplete)
            .subscribe((completeIsTrue) => {
                if (completeIsTrue) {
                    this.coverScreen()
                }
            });

        this.subscriptions.zoom_state = this.store.select(zoomState)
            .skip(1)
            .subscribe(zoom_state => {
                if (zoom_state === 'cover') {
                    this.coverScreen();
                } else {
                    this.fitOnScreen();
                }
            });

        this.subscriptions.nav_end = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((event: NavigationEnd) => {

                this.store.dispatch(new AppPreloadCompleteAction());

            });

        this.subscriptions.nav_start = this.router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((event: NavigationStart) => {

                this.visible = false;

            });

        this.store.dispatch(new AppPreloadCompleteAction());
    }


    ngOnDestroy () {

        this.subscriptions.current_photo.unsubscribe();
        this.subscriptions.load_complete.unsubscribe();
        this.subscriptions.zoom_state.unsubscribe();
        this.subscriptions.nav_start.unsubscribe();
        this.subscriptions.nav_end.unsubscribe();

    }


    onMouseUp() {

        if (!this.isDragging) {
            this.store.dispatch(new PhotosToggleZoom());
            clearTimeout(this.mouseTimeout);
        } else {
            this.isDragging = false;
        }

    }

    dragPhoto(evt: MouseEvent): void {

        this.mouseTimeout = setTimeout(() => {

            //  Make vertical motion the default. ns is north/south,
            //  like the cursor properties.
            let direction = 'ns';
            if ( this.file.width > this.file.height ) {
                direction = 'ew';
            }

            this.DragManager.startDrag(direction, evt);
            this.isDragging = true;

        }, 85);
    }


    private coverScreen(): void {
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


    private fitOnScreen(): void {

        let top, left,
            imgH, imgW,
            viewH, menuH,
            imgRatio, viewRatio,
            gutter = 15;

        if (typeof this.file === 'undefined') {
            this.inlineStyles =  '';
            return;
        }

        imgH = this.file.height;
        imgW = this.file.width;
        menuH = document.getElementsByTagName('app-topbar').item(0).getBoundingClientRect().height;

        top = menuH + gutter;;
        left = gutter;

        viewH = this.winH - menuH - (gutter * 2);
        imgRatio = imgW / imgH;
        viewRatio = this.winW / viewH;

        if (imgRatio > viewRatio) {

            imgW = this.winW - (gutter * 2);
            imgH = Math.round(imgW / imgRatio);
            top = menuH + gutter - Math.round((imgH - viewH) / 2);

        } else {

            imgH = viewH;
            imgW = Math.round(imgH * imgRatio);
            top = menuH + gutter;
            left = Math.round((this.winW - imgW) / 2);

        }

        var styles = [];
        styles.push('background-image:' + this.file.cssUrl());
        styles.push(`height:${imgH}px`);
        styles.push(`width:${imgW}px`);
        styles.push(`top:${top}px`);
        styles.push(`left:${left}px`);
        styles.push('cursor:auto');

        this.inlineStyles =  this.sanitzer.bypassSecurityTrustStyle(styles.join(';'));
    }

}
