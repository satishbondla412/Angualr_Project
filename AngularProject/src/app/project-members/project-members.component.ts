import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectMemberService } from '../services/projectMember.service';
import { AuthService } from '../auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-project-members',
  templateUrl: './project-members.component.html',
  styleUrls: ['./project-members.component.scss']
})
export class projectMembersComponent implements OnInit {

  taskDeatilsForm: FormGroup;
  taskDeatils;
  members;
  deleteId;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private projectMemberService: ProjectMemberService,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) { }

  ngOnInit() {

   // localStorage.setItem('state','members');
   this.spinner.show();
    this.authService.activeMenu='members'
    this.projectMemberService.getProjectMembers(localStorage.getItem('apiToken')).subscribe((resp) => {
      this.members = resp;
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
  AddMemeber(){
    this.router.navigate([`member-details`], { queryParams: { id: null } });
  }
  edit(id){
    this.router.navigate([`member-details`], { queryParams: { id: id } });
   }
  delete(id){
    this.deleteId=id;
    this.projectMemberService.deleteProjectMember(this.deleteId,localStorage.getItem('apiToken')).subscribe((response)=>{
      this.projectMemberService.getProjectMembers(localStorage.getItem('apiToken')).subscribe((tasksResp) => {
        this.members = tasksResp;
        alert("Member deleted successfully");
    },
    err => {
      if (err.error) {
        alert(err.error.message); 
      }
    }); 
     },
    err => {
      if (err.error) {
        alert("Cannot delete the member. Check dependency");
      }
    });
  }
}