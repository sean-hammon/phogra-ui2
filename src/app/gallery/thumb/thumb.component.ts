import { trigger, style, animate, transition } from "@angular/animations";
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Photo } from "../../../phogra/photos/photo";
import { Gallery } from "../../../phogra/galleries/gallery";

@Component({
    selector: 'app-thumb',
    templateUrl: './thumb.component.html',
    styleUrls: ['./thumb.component.sass'],
    animations: [
        trigger('thumbAnimation', [
            transition('void => *', [
                style({opacity: 0}),
                animate('750ms', style({opacity: 1}))
            ])
        ])
    ]
})
export class ThumbComponent implements OnInit {

    @HostBinding('@thumbAnimation')

    @Input()
    thumb: Photo;

    @Input()
    gallery: Gallery;

    thumb_link: string;

    ngOnInit() {
        this.thumb_link = `${this.thumb.links.ui}/in/${this.gallery.path}/${this.thumb.id}`;
    }

}
