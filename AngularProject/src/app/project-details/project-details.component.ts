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
      this.formBuilder(this.projectDeatils);
      this.spinner.hide();
    }
    
  }
  formBuilder(data){
    let details = data ? data : null;  
    this.projectDeatilsForm = this.fb.group({
    projectname: [ (details && details.name) ? details.name : '', Validators.required],
    description: [ (details && details.description) ?details.description : '', Validators.required]
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

  save() {
    this.submitted=true;
    if(this.projectDeatilsForm.valid){
    let formValue = this.projectDeatilsForm.value;
        const formReqData = {
          api_token: localStorage.getItem('apiToken'),
          name: formValue.projectname,
          description:formValue.description,
         // AssignedTo: formValue.assignee,
          // project_id: formValue.projectID,
          // status: formValue.taskStatus
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