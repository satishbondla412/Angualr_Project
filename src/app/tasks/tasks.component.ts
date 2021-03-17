import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { AuthService } from '../auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks;
  userId;
  userRole;
  constructor(
    private router: Router,
    private tasksService: TasksService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
  ) { }
  ngOnInit() {
  
    //localStorage.setItem('state','tasks');
    this.spinner.show();
    this.authService.activeMenu='tasks'
    this.userId=localStorage.getItem('userID'); 
    this.userRole=localStorage.getItem('userRole'); 
debugger;
    if(this.userRole == 'admin' || this.userRole =='manager'){
    this.tasksService.getAllTasks(localStorage.getItem('apiToken')).subscribe((tasksResp) => {
      this.tasks = tasksResp;
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