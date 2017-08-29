import { Component, Input, OnInit } from '@angular/core';
import { Photo } from "../../../phogra/photos/photo";
import { Gallery } from "../../../phogra/galleries/gallery";

@Component({
    selector: 'app-thumb',
    templateUrl: './thumb.component.html',
    styleUrls: ['./thumb.component.sass']
})
export class ThumbComponent implements OnInit {

    @Input()
    thumb: Photo;

    @Input()
    gallery: Gallery;

    thumb_link: string;

    ngOnInit() {
        this.thumb_link = `${this.thumb.links.ui}/in/${this.gallery.path}/${this.thumb.id}`;
    }

}
