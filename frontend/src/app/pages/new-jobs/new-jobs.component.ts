import { Component, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { disable } from '@rxweb/reactive-form-validators';
import { min } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { JobService } from 'src/app/service/jonService';

@Component({
  selector: 'app-new-jobs',
  templateUrl: './new-jobs.component.html',
  styleUrls: ['./new-jobs.component.scss']
})
export class NewJobsComponent {
  @Input() jobDetail: any = null; 
  // form: Job = {
  //   id: Math.random(),
  //   job_number: '',
  //   job_title: '',
  //   job_start_date: null,
  //   job_close_date:  null,
  //   experience_required: true,
  //   number_of_openings: 0,
  //   job_notes: ''
  // }
  myForm: any;
  constructor(private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private jobService: JobService
    ) {
    this.myForm = this.fb.group({
      id: Math.random(),
      job_number: ['', [Validators.required]],
      job_title: ['', [Validators.required]],
      // job_start_date: ['', [Validators.required, minDateValidator(new Date())]],
      job_start_date: ['', [Validators.required]],
      job_close_date: ['', [Validators.required]],
      experience_required: [true, [Validators.required]],
      number_of_openings: [1, [Validators.required]],
      job_notes: ['', [Validators.required]],
    });
   }
   

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['jobDetail'].currentValue);
    let updateValue = changes['jobDetail'].currentValue;
    this.jobDetail ? this.myForm.setValue(updateValue) : '';
	}


  onSubmit() {
    this.jobService.addUser(this.myForm.value);
    // this.apiService.newJob(this.myForm.value).subscribe(data => {
    //   console.log(data);
    //   this.router.navigateByUrl('/');
    // })      
  }

  update() {
    const updatedUser = {...this.jobDetail, ...this.myForm.value};
    this.jobService.updateUser(updatedUser);
    // this.apiService.updateJob(this.myForm.get('id').value,this.myForm.value).subscribe(data => {
    //   this.router.navigateByUrl('/');
    // })      
  }

}

export function minDateValidator(minDate: Date): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let selectedDate = new Date(control.value);
    const invalid = selectedDate < minDate;
    return invalid ? {'minDate': {value: control.value}} : null;
  };
}