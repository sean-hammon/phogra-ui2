import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'app-viewport',
    templateUrl: './viewport.component.html',
    styleUrls: ['./viewport.component.sass']
})
export class ViewportComponent implements OnInit {

    @HostBinding('class')
    public get host_class() { return 'full-frame'; }

    constructor() {
    }

    ngOnInit() {
    }

}
