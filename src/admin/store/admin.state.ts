import { User } from '../../phogra/user/user.model';
import { HttpErrorResponse } from '@angular/common/http';

export interface AdminState {
    user: User,
    apiError: HttpErrorResponse
}

export const initialState: AdminState = {
    user: null,
    apiError: null
};

export const apiErrorState = (store) => store.adminState.apiError;
export const userState = (store) => store.adminState.user;
