import { Job } from "../models/model";


export const JOB_LIST_REQUEST = 'job list request';
export const JOB_LIST_SUCCESS = 'job list success';
export const JOB_DELETE = 'job delete';
export const JOB_UPDATE = 'job update';
export const JOB_ADD = 'job add';
export const JOB_LIST_ERROR = 'job list error';

export class JobListRequestAction {
  readonly type = JOB_LIST_REQUEST;
}

export class JobDeleteAction {
    readonly type = JOB_DELETE;
  
    constructor(public payload?: { id: number }) {
    }
  }
  
  export class JobUpdateAction {
    readonly type = JOB_UPDATE;
  
    constructor(public payload?: { data: Job }) {
    }
  }
  
  export class JobAddAction {
    readonly type = JOB_ADD;
  
    constructor(public payload?: { data: Job }) {
    }
  }
  
  export class JobListErrorAction {
    readonly type = JOB_LIST_ERROR;
  }
  
  export class JobListSuccessAction {
    readonly type = JOB_LIST_SUCCESS;
  
    constructor(public payload?: { data: Job[] }) {
    }
  }