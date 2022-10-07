import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {Store} from '@ngrx/store';
import { combineLatest, Observable, take } from 'rxjs';
import { JobListRequestAction,JobAddAction, JobUpdateAction, JobListSuccessAction, JobListErrorAction, JobDeleteAction } from '../actions/job-action';
import { Job } from '../models/model';
import { getUserById, getUserError, getUserLoaded, getUserLoading, getUsers, RootReducerState } from '../reducers';
import {ApiService} from './api.service';


@Injectable()
export class JobService {
  constructor(private store: Store<RootReducerState>, private apiService: ApiService,   private router: Router,) {
  }

  getUserList(force = false): [Observable<boolean>, Observable<Job[]>, Observable<boolean>] {
    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUserData$ = this.store.select(getUsers);
    const getError$ = this.store.select(getUserError);
    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data) => {
      if ((!data[0] && !data[1]) || force) {
        this.store.dispatch(new JobListRequestAction());
        this.apiService.getAllJobs().subscribe(res => {
          this.store.dispatch(new JobListSuccessAction({data: res}));
        }, error => {
          this.store.dispatch(new JobListErrorAction());
        });
      }
    });
    return [loading$, getUserData$, getError$];
  }

  deleteUser(id: number) {
    // first we will call actual delete api
    this.apiService.deleteJob(id).subscribe(data => {
      console.log(data);
      this.store.dispatch(new JobDeleteAction({id}));
    })  
   
  }

  updateUser(data: Job) {
// first send details to actual api
    this.apiService.updateJob(data.id,data).subscribe((data: Job): void => {
      this.store.dispatch(new JobUpdateAction({data}));
      this.router.navigateByUrl('/');
    })  
    // this.store.dispatch(new JobUpdateAction({data}));
  }

  addUser(data: Job) {
    // first call api to add a user and then update it in store
    this.apiService.newJob(data).subscribe(data => {
      console.log(data);
      this.store.dispatch(new JobAddAction({data}));
      this.router.navigateByUrl('/');
    })  
 
  }

  getUserById(id: number, force: boolean = false) {
    // get user from reducer if exist otherwise from api
    const jon$ = this.store.select(state => getUserById(state, id));
    console.log(jon$);
    jon$.pipe(take(1)).subscribe(res => {
      console.log(res);
      if (force || !res) {
        console.log(force);
        return this.apiService.getJobById(id).subscribe(data => {
          // return data;
          this.store.dispatch(new JobAddAction({data}));
        });
      }
      console.log(res);
      return res;
    });
    return jon$;
  }
}