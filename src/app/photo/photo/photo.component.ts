import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.sass']
})
export class PhotoComponent implements OnInit {

    @HostBinding('class.full-frame') true;

    constructor() {
    }

    ngOnInit() {
    }

}
