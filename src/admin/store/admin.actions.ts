import { Action } from '@ngrx/store';
import { IUserLogin, User } from '../../phogra/user/user.model';

export interface ReducerAction extends Action{
    type: string;
    payload?: any
}

export const AdminActions = {
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR'
};


export class LoginAction implements ReducerAction {
    readonly type = AdminActions.LOGIN;
    constructor (public payload: IUserLogin) {}
}


export class LoginSuccessAction implements ReducerAction {
    readonly type = AdminActions.LOGIN_SUCCESS;
    constructor (public payload: User) {}
}


export class LoginErrorAction implements ReducerAction {
    readonly type = AdminActions.LOGIN_ERROR;
    constructor (public payload: any) {}
}
