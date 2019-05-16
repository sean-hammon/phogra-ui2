import { Query } from '@datorama/akita';
import {SessionState, SessionStore} from 'app/store/session.store';

export class SessionQuery extends Query<SessionState> {

    loading$ = this.select(state => state.loading);
    menuState$ = this.select(state => state.menuOpen);

    constructor(protected store: SessionStore) {
        super(store);
    }

}
