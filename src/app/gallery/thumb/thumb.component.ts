import { Component, Input, OnInit } from '@angular/core';
import { Gallery } from '../../../phogra/galleries/gallery';
import { Photo } from '../../../phogra/photos/photo';

@Component({
    selector: 'app-thumb',
    templateUrl: './thumb.component.html',
    styleUrls: ['./thumb.component.sass']
})
export class ThumbComponent implements OnInit {

    @Input('type')
    type: string;

    @Input('obj')
    obj: Gallery|Photo;

    constructor() {}

    ngOnInit() {}

}
