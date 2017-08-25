import { Component, HostBinding } from '@angular/core';
import { trigger, state, style, animate, transition } from "@angular/animations";
import { Store } from "@ngrx/store";
import { loadingState } from "../../store/app.state";

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
export class SpinnerComponent {

    loading: string;
    display: boolean;

    constructor(
        private store: Store<any>
    ){
        this.display = true;
        store.select(loadingState)
            .subscribe(loading => {
                this.loading = loading ? 'visible' : 'hidden';
                this.display = true;
            });
    }


    animationDone($event) {
        this.display = this.loading !== 'hidden';
    }

}
