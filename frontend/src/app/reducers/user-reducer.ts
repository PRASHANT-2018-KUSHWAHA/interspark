import {Action} from '../actions';
import {JOB_ADD, JOB_DELETE, JOB_LIST_ERROR, JOB_LIST_REQUEST, JOB_LIST_SUCCESS, JOB_UPDATE} from '../actions/job-action';
import {StoreUtility} from '../utils/store-utility';
import {createSelector} from '@ngrx/store';
import { Job } from '../models/model';

export interface UserReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  entities: { [id: number]: Job };
  ids: number[];
}

const initialState: UserReducerState = {
  loaded: false,
  loading: false,
  error: false,
  entities: {},
  ids: []
};

export function UserReducer(state = initialState, action: Action): UserReducerState {
  switch (action.type) {
    case JOB_LIST_REQUEST: {
      return {...state, loading: true};
    }
    case JOB_DELETE: {
      const id = action.payload.id;
      const newIds = state.ids.filter(elem => elem !== id);
      const newEntities = StoreUtility.removeKey(state.entities, id);
      return {...state, ...{entities: newEntities, ids: newIds}};
    }
    case JOB_UPDATE: {
      const job = action.payload.data;
      const entity = {[job.id]: job};
      const updatedEntities = {...state.entities, ...entity};
      return {...state, ...{entities: updatedEntities}};
    }
    case JOB_ADD: {
      const job = action.payload.data;
      const entity = {[job.id]: job};
      const newEntities = {...state.entities, ...entity};
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, job.id]);
      return {...state, ...{entities: newEntities, ids: newIds}};

    }
    case JOB_LIST_ERROR: {
      return {...state, error: true, loading: false};
    }
    case JOB_LIST_SUCCESS: {
      const jobs = action.payload.data;
      const obj = StoreUtility.normalize(jobs);
      const newEntities = {...state.entities, ...obj};
      const ids = jobs.map((job: { id: any; }) => job.id);
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, ...ids]);
      return {
        ...state, ...{
          loaded: true,
          loading: false, error: false,
          entities: newEntities, ids: newIds
        }
      };
    }
    default: {
      return state;
    }
  }
}

// selectors
export const getLoading = (state: UserReducerState) => {
  console.log(state);
  return state.loading;
};
export const getLoaded = (state: UserReducerState) => {
  return state.loaded;
};
export const getEntities = (state: UserReducerState) => {
  return state.entities;
};
export const getIds = (state: UserReducerState) => {
  return state.ids;
};
export const getUsers = createSelector(getEntities,
  (entities) => StoreUtility.unNormalized(entities));
export const getError = (state: UserReducerState) => {
  return state.error;
};

