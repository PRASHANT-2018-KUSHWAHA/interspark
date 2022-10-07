import * as fromJobs from './user-reducer';
import {ActionReducerMap, createSelector} from '@ngrx/store';


export interface RootReducerState {
  users: fromJobs.UserReducerState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  users: fromJobs.UserReducer,
};

export const getUserState = (state: RootReducerState) => {
  return state.users;
};

export const getUserLoaded = createSelector(getUserState, fromJobs.getLoaded);
export const getUserLoading = createSelector(getUserState, fromJobs.getLoading);
export const getUserEntities = createSelector(getUserState, fromJobs.getEntities);
export const getUsers = createSelector(getUserState, fromJobs.getUsers);
export const getUserError = createSelector(getUserState, fromJobs.getError);

export const getUserById = (state: RootReducerState, id: number) => {
  const entities = getUserEntities(state);
  return entities[id];
};
