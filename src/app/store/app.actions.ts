export interface ReducerAction
{
    type: string;
    payload?: any;
}

export const TOGGLE_MENU = 'TOGGLE_MENU';

export const GET_GALLERIES = 'GET_GALLERIES';
export const GET_GALLERIES_SUCCESS = 'GET_GALLERIES_SUCCESS';
export const GET_GALLERIES_ERROR = 'GET_GALLERIES_ERROR';
