import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { AuthService } from '../auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks;
  userId;
  userRole;
  assignees;
  constructor(
    private router: Router,
    private tasksService: TasksService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private userService: UsersService
  ) { }

  ngOnInit() {
  
    //localStorage.setItem('state','tasks');
    this.spinner.show();
    this.authService.activeMenu='tasks'
    this.userId=localStorage.getItem('userID'); 
    this.userRole=localStorage.getItem('userRole'); 
    if(this.userRole == 'admin' || this.userRole =='manager'){
    this.tasksService.getAllTasks(localStorage.getItem('apiToken')).subscribe((tasksResp) => {
      this.tasks = tasksResp;
      this.userService.getUsers(localStorage.getItem('apiToken')).subscribe((resp) => {
        this.assignees = resp;
        this.tasks.forEach((task)=>{
          this.assignees.forEach((assignee)=>{
             if(assignee.id == task.AssignedTo){
             task.name=assignee.name;
             }
             this.spinner.hide();
           })
         })
      });
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      if (err.error) {
        alert(err.error.message);
      }
    });
  }
    else{
      this.tasksService.getUserTasks(this.userId,localStorage.getItem('apiToken')).subscribe((resp)=>{
        this.tasks=resp;
        this.userService.getUsers(localStorage.getItem('apiToken')).subscribe((resp) => {
          this.assignees = resp;
          this.tasks.forEach((task)=>{
            this.assignees.forEach((assignee)=>{
               if(assignee.id == task.AssignedTo){
               task.name=assignee.name;
               }
               this.spinner.hide();
             })
           })
        });
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        if (err.error) {
          alert(err.error.message);
        }
      });
    }
  }  
  goToDetailePage(id) {
    this.router.navigate([`task-details`], { queryParams: { id: id } });
  }
  createNewTask(from) {
    this.router.navigate([`task-details`], { queryParams: { id: null } });
  }
  goToStatics() {
    this.router.navigate([`statics`])
  }
}