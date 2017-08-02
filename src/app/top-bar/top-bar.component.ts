import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import "rxjs/add/operator/filter";

@Component({
    selector: 'app-topbar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit {

    constructor(private router: Router) {}


    ngOnInit() {
    }

}

