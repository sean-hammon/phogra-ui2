import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

    pageTitle = 'Photography Admin';

    constructor(
        private title: Title
    ) { }

    ngOnInit() {
        this.title.setTitle(this.pageTitle);
    }
}
