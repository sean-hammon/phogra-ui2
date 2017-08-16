export interface ReducerAction
{
    type: string;
    payload?: any;
}

export const TOGGLE_MENU = 'TOGGLE_MENU';

export const FETCH_GALLERIES = 'FETCH_GALLERIES';
export const FETCH_GALLERIES_SUCCESS = 'FETCH_GALLERIES_SUCCESS';
export const FETCH_GALLERIES_ERROR = 'FETCH_GALLERIES_ERROR';

export const SET_CURRENT_GALLERY = 'SET_CURRENT_GALLERY';
