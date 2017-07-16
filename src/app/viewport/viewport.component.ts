import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-viewport',
    templateUrl: './viewport.component.html',
    styleUrls: ['./viewport.component.sass'],
    host: {
        class: 'full-frame'
    }
})
export class ViewportComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
