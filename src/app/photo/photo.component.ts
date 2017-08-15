import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.sass'],
    host: {
        class: 'full-frame'
    }
})
export class PhotoComponent implements OnInit {

    constructor(
    ) { }

    ngOnInit() {
    }

}
