import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

    pageTitle = 'Sean Hammon Photography';

    constructor(
        private title: Title
    ) { }

    ngOnInit() {
        this.title.setTitle(this.pageTitle);
    }
}
