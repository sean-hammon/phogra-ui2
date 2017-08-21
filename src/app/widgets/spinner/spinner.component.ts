import { Component, HostBinding } from '@angular/core';
import { Store } from "@ngrx/store";
import { loadingState } from "../../store/app.state";

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.sass']
})
export class SpinnerComponent {

    @HostBinding('class')
    public get getClass() {
        return this.loading ? 'full-frame' : '';
    }

    loading: boolean;

    constructor(
        private store: Store<any>
    ){
        store.select(loadingState)
            .subscribe(loading => {
                this.loading = loading
            });
    }

}
