import { Injectable } from "@angular/core";

export interface AppState {
    menuOpen: boolean;
}

@Injectable()
export class StateService implements AppState{

    public menuOpen: boolean = false;


    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
}

