import { Action } from '@ngrx/store';
import { Gallery } from '../../phogra/galleries/gallery';

export const AppActions = {
    API_GALLERIES_LOADED: ''
};

export class GalleriesLoadedAction implements Action {
    readonly type = AppActions.API_GALLERIES_LOADED;
    constructor(public payload: Gallery[]) {}
}
