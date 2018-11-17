import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Gallery } from '../../phogra/galleries/gallery';
import { Photo } from '../../phogra/photos/photo';
import { AppState } from '../store/app.state';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.sass']
})
export class TopbarComponent implements OnInit {

    onDisplay: Photo | Gallery;

    constructor(
        private store: Store<AppState>
    ) {}

    ngOnInit() {

    }

}
