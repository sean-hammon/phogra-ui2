import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from "@angular/animations";
import { Store } from "@ngrx/store";
import { Subscription } from 'rxjs';
// import { loadingState } from "../../store/app.state";

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
    subscription: Subscription;

    constructor(
        private store: Store<any>
    ){
        this.display = true;
    }

    ngOnInit () {

        // this.subscription = this.store.select(loadingState)
        //     .subscribe(loading => {
        //         this.loading = loading ? 'visible' : 'hidden';
        //         this.display = true;
        //     });

    }


    ngOnDestroy () {
            this.subscription.unsubscribe();
    }


    animationDone($event) {
        this.display = this.loading !== 'hidden';
    }

}
