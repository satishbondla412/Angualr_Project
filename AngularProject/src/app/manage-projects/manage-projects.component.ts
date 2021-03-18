import { ActivatedRoute,Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../services/projects.services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.scss']
})
export class ManageProjectsComponent implements OnInit {

  taskDeatilsForm: FormGroup;
  taskDeatils;
  projects;
  deleteId;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private projectsService: ProjectsService
  ) { }

  ngOnInit() {

    localStorage.setItem('state','projects');
    this.spinner.show();
    this.projectsService.getProjects(localStorage.getItem('apiToken')).subscribe((tasksResp) => {
      this.projects = tasksResp;
      this.spinner.hide();
  },
  err => {
    this.spinner.hide();
    if (err.error) {
      alert(err.error.message);
    }
  });
  }

  save() {
    
  }
  edit(id){
    this.router.navigate([`project-details`], { queryParams: { id: id } });
  }
  createProject(){
    this.router.navigate([`project-details`], { queryParams: { id: null } });
  }
  // deleteProject(id){
  //   this.router.navigate([`project-details`], { queryParams: { id: id } });
  // }

  delete(id){
    this.deleteId=id;
    this.projectsService.deleteProject(this.deleteId,localStorage.getItem('apiToken')).subscribe((response)=>{
      this.projectsService.getProjects(localStorage.getItem('apiToken')).subscribe((tasksResp) => {
        this.projects = tasksResp;
        alert("Project deleted successfully");
    },
    err => {
      if (err.error) {
        alert(err.error.message);
      }
    }); 
    },
    err => {
      if (err.error) {
        alert("Cannot delete the project. Check dependency");
      }
    });
  }
  // delete(){
  //   this.projectsService.deleteProject(this.deleteId,localStorage.getItem('apiToken')).subscribe((response)=>{
  //         this.router.navigate([`projects`])
  //   }
  // }
}

