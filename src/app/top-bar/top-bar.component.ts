import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/skip';
import { Store } from '@ngrx/store';
import { currentPhoto } from '../store/app.state';

@Component({
    selector: 'app-topbar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit {

    page_title: string;
    photo_description: string;

    constructor(
        private store: Store<any>,
        private router: Router
    ) {
        store.select(currentPhoto).skip(1)
            .subscribe(photo => {
                this.page_title = photo.title;
                this.photo_description = photo.short_desc;
            });

    }


    ngOnInit() {
        this.router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe(() => {
                this.page_title = '';
                this.photo_description = '';
            });
    }

}

