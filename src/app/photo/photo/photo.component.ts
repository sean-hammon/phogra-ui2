import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.sass'],
    animations: [
        trigger('crossFade', [
            state('showing', style({
                opacity: 1
            })),
            state('hidden', style({
                opacity: 0
            })),
            transition('hidden <=> showing', [
                animate('0.75s')
            ])
        ]),
    ]
})
export class PhotoComponent implements OnInit {

    @HostBinding('class.full-frame') true;

    svgVisible = false;
    photoVisible = false;

    constructor() {
    }

    ngOnInit() {
    }

}
