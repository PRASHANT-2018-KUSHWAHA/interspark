import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/models/model';
import { ApiService } from 'src/app/service/api.service';
import { JobService } from 'src/app/service/jonService';
import {filter, map, switchMap, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  jobDetail:Job = {
    id: '0',
    job_number: '',
    job_title: '',
    job_start_date: null,
    job_close_date:  null,
    experience_required: false,
    number_of_openings: 0,
    job_notes: ''
  };
  id: any;
  isAlive = true;
  constructor(private apiService: ApiService, private route: ActivatedRoute,  private jobService: JobService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.fetchData();
    // const data =  this.jobService.getUserById(this.id, false);
    // console.log(data);
    // this.apiService.getJobById(this.id).subscribe((data: any) => {
    //   this.jobDetail = data;
    //   console.log(data);
    // })
  }
  
  ngOnDestroy() {
    this.isAlive = false;
  }

  fetchData() {
    const job$ = this.route.params.pipe(map(data => data['id']),
    
      takeWhile(() => this.isAlive),
      switchMap((id) => {
        console.log(job$);
        return this.jobService.getUserById(id);
      }), filter(res => !!res));
      job$.subscribe(data => {
      this.jobDetail = data;
    });
  }

}
