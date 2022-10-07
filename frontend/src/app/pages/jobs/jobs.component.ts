import { Component, OnDestroy, OnInit } from '@angular/core';
import { Job } from 'src/app/models/model';
import { ApiService } from 'src/app/service/api.service';
import { JobService } from 'src/app/service/jonService';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit, OnDestroy {
  jobList:Job[] = [];
  loading = false;
  error = false;
  isAlive = true;
  constructor(private apiService: ApiService, private jobService: JobService) { }

  // ngOnInit(): void {
  //   this.getJobsList();
  // }

  // getJobsList() {
  //   this.apiService.getAllJobs().subscribe((data: any) => {
  //     this.jobList = data;
  //   })
  // }

  delete(id: any) {
    this.jobService.deleteUser(id);
  }


  ngOnInit() {
    this.fetchData();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  fetchData() {
    const observer$ = this.jobService.getUserList();
    const jobData$ = observer$[1];
    const loading$ = observer$[0];
    const error$ = observer$[2];
    jobData$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.jobList = data;
    });
    loading$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.loading = data;
    });
    error$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.error = data;
    });
  }

}
