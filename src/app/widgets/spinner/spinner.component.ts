import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.sass'],
    animations: [
        trigger('spinnerState', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('hidden => visible', animate('10ms')),
            transition('visible => hidden', animate('1500ms ease-out'))
        ])
    ]

})
export class SpinnerComponent implements OnInit, OnDestroy {

    loading: string;
    display: boolean;

    constructor(
    ){
        this.display = true;
    }

    ngOnInit () {
    }


    ngOnDestroy () {
    }


    animationDone($event) {
        this.display = this.loading !== 'hidden';
    }

}
