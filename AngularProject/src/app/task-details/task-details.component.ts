import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { TasksService } from '../services/tasks.service';
import { ProjectsService } from '../services/projects.services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TasksDetailsComponent implements OnInit {

  taskDeatilsForm: FormGroup;
  taskDeatils;
  assignees;
  taskStatuses;
  isFromCreate = false;
  submitted = false;
  taskID: any;
  projects;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService,
    private tasksService: TasksService,
    private projectsService: ProjectsService,
    private spinner: NgxSpinnerService
  ) { }
  
  ngOnInit() {
    this.taskStatuses = [{id:1, name:"assigned"}, {id:1, name:"resolved"}, {id:1, name:"pending"}];
    this.route.queryParams.subscribe(params => {
      this.taskID = params['id']
    });
    this.spinner.show();
    this.formBuilder(null);
    this.userService.getUsers(localStorage.getItem('apiToken')).subscribe((resp) => {
      this.assignees = resp;
    });
    this.projectsService.getProjects(localStorage.getItem('apiToken')).subscribe((resp) => {
      this.projects = resp;
    });
    if (this.taskID) {
      this.tasksService.getOneTask(this.taskID, localStorage.getItem('apiToken')).subscribe((respDeatils) => {
        
        this.taskDeatils = respDeatils;
        this.formBuilder(this.taskDeatils);
        this.spinner.hide();
      });
    }
    else {
      this.taskDeatils = null;
      this.formBuilder(this.taskDeatils);
      this.spinner.hide();
    }
  }

  formBuilder(data){
    let details = data ? data : null;
    this.taskDeatilsForm = this.fb.group({
      title: [ (details && details.title) ? details.title : '', Validators.required],
      description: [ (details && details.description) ?details.description : '', Validators.required],
      assignee: [ (details && details.AssignedTo) ? details.AssignedTo : '', Validators.required],
      projectID: [ (details && details.project_id) ? details.project_id : '', Validators.required],
      taskStatus: [ (details && details.status) ? details.status : '', Validators.required],
      deadline: [ (details && details.dead_line) ? details.dead_line : '', Validators.required]
    });
  }


  // convenience getter for easy access to form fields
  get tasksForm() { return this.taskDeatilsForm.controls; }

  assigneeChange(e){

  }

  taskStatusChange(e) {
    
  }

  cancel() {
    this.router.navigate([`tasks`]);
  }

  saveTask() {
    this.submitted=true;
    if(this.taskDeatilsForm.valid){
    let formValue = this.taskDeatilsForm.value;
        const formReqData = {
          api_token: localStorage.getItem('apiToken'),
          title: formValue.title,
          description:formValue.description,
          AssignedTo: formValue.assignee,
          project_id: formValue.projectID,
          status: formValue.taskStatus,
          dead_line :formValue.deadline
        };
         if(!this.taskID){
          this.tasksService.CreateTask(formReqData).subscribe(()=>{
            this.router.navigate([`tasks`]);
            

          })
         }
         else {
          this.tasksService.updateTask(this.taskID, formReqData).subscribe((response)=>{
               this.router.navigate([`tasks`]);
          }
          )
      }
    }
    }

}