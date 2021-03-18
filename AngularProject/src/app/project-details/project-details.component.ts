import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../services/projects.services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  projectDeatilsForm: FormGroup;
  taskDeatils;
  isFromCreate = false;
  submitted = false;
  id;
  projects;
  projectID;
  projectDeatils;
  myDate;	
  myDate1;
  deleteId;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private projectsService: ProjectsService
  ) { }

  ngOnInit() {
   
    this.route.queryParams.subscribe(params => {
      this.projectID = params['id']
    });
    this.spinner.show();
    this.formBuilder(null);
    this.projectsService.getProjects(localStorage.getItem('apiToken')).subscribe((resp) => {
      this.projects = resp;
    },
    err => {
      this.spinner.hide();
      if (err.error) {
        alert(err.error.message);
      }
    });
    if (this.projectID) {
      this.projectsService.getOneProject(this.projectID, localStorage.getItem('apiToken')).subscribe((respDeatils) => {
        this.projectDeatils = respDeatils;
        this.myDate = respDeatils.start_date;
        this.myDate1 = respDeatils.end_date;
        debugger;
        this.formBuilder(this.projectDeatils);
        this.spinner.hide();
      },
      err => {
        this.spinner.hide(); 
        if (err.error) {
          alert(err.error.message);
        }
      });
    }
    else {
      this.projectDeatils = null;
      this.myDate = new Date();
      this.myDate1 = new Date();
      this.formBuilder(this.projectDeatils);
      this.spinner.hide();
    }
    
  }
  formBuilder(data){
    let details = data ? data : null;  
    this.projectDeatilsForm = this.fb.group({
    projectname: [ (details && details.name) ? details.name : '', Validators.required],
    description: [ (details && details.description) ?details.description : '', Validators.required],
    startdate: [ (details && details.start_date) ?details.start_date :  new Date(), Validators.required],
    enddate: [ (details && details.end_date) ?details.end_date :  new Date(),Validators.required]
  });
}

  // convenience getter for easy access to form fields
  get projectsForm() { return this.projectDeatilsForm.controls; }

  assigneeChange(e){

  }

  taskStatusChange(e) {
    
  }

  cancel() {
    this.router.navigate([`projects`]);
  }

  getDate(_date) {
    var date = new Date(_date), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}

  save() {
    this.submitted=true;
    if(this.projectDeatilsForm.valid){
    let formValue = this.projectDeatilsForm.value;
    let sdate = this.getDate(formValue.startdate);
    let edate = this.getDate(formValue.enddate);
        const formReqData = {
          api_token: localStorage.getItem('apiToken'),
          name: formValue.projectname,
          description:formValue.description,
          start_date: sdate,
           end_date: edate
        };
         if(!this.projectID){
          this.projectsService.CreateProject(formReqData).subscribe(()=>{
            this.router.navigate([`projects`]);
            alert("Project created successfully");
          },
          err => {
            this.spinner.hide();
            if (err.error) {
              alert(err.error.message);
            }
          });
         }
         else {
          this.projectsService.updateProject(this.projectID, formReqData).subscribe((response)=>{
               this.router.navigate([`projects`]);
               alert("Project updated successfully");
          },
          err => {
            this.spinner.hide();
            if (err.error) {
              alert(err.error.message);
            }
          });
          
      }
    }
  }

}