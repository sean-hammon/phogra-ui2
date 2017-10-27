import { User } from '../../phogra/user/user.model';

export interface AdminState {
    user: User
}

export const initialState: AdminState = {
    user: null
};

