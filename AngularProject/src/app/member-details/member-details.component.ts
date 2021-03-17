import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectMemberService } from '../services/projectMember.service';
import { UsersService } from '../services/users.service';
import { ProjectsService } from '../services/projects.services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {
  memberDeatilsForm: FormGroup;
  memeberDeatils;
  projects;
  roles;
  isFromCreate = false;
  submitted = false;
  memberID: any;
  assignees;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private projectMemberService: ProjectMemberService,
    private usersService: UsersService,
    private spinner: NgxSpinnerService,
    private projectsService:ProjectsService

  ) { }

  ngOnInit() {
   
    this.route.queryParams.subscribe(params => {
      this.memberID = params['id']
    });
    this.spinner.show();
    
    this.formBuilder(null);
    this.usersService.getUsers(localStorage.getItem('apiToken')).subscribe((resp) => {
      this.assignees = resp;
    },
    err => {
      this.spinner.hide();
      if (err.error) {
        alert(err.error.message);
      }
    });
    this.projectsService.getProjects(localStorage.getItem('apiToken')).subscribe((resp) => {
      this.projects = resp;
    });
    if (this.memberID) {
      this.projectMemberService.getOneMember(this.memberID, localStorage.getItem('apiToken')).subscribe((respDeatils) => {
        
        this.memeberDeatils = respDeatils;
        this.formBuilder(this.memeberDeatils);
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
      this.memeberDeatils = null;
      this.formBuilder(this.memeberDeatils);
      this.spinner.hide();
    }
  }

  formBuilder(data){
    debugger;
    let details = data ? data : null;  
    this.memberDeatilsForm = this.fb.group({
      userName: [ (details && details.user_id) ? details.user_id : '', Validators.required],
      projectName: [ (details && details.project_id) ?details.project_id : '', Validators.required]
     // userId: [ (details && details.id) ? details.id : '', Validators.required]
      // role: [ (details && details.project_id) ? details.project_id : '', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get membersForm() { return this.memberDeatilsForm.controls; }

  assigneeChange(e){

  }

  taskStatusChange(e) {
    
  }

  cancel() {
    this.router.navigate([`projects-members`]);
  }

  save() {
    this.submitted=true;
    if(this.memberDeatilsForm.valid){
    let formValue = this.memberDeatilsForm.value;
        const formReqData = {
          api_token: localStorage.getItem('apiToken'),
          user_id: formValue.userName,
          project_id:formValue.projectName
         // AssignedTo: formValue.assignee,
          // project_id: formValue.projectID,
          // status: formValue.taskStatus
        };
         if(!this.memberID){
           debugger;
          this.projectMemberService.createteProjectMember(formReqData).subscribe(()=>{
            this.router.navigate([`projects-members`]);
            debugger;
            alert("Member Created successfully");
          },
          err => {
            this.spinner.hide();
            if (err.error) {
              alert(err.error.message);
            }
          });
         }
         else {
          this.projectMemberService.updateProjectMember(this.memberID, formReqData).subscribe((response)=>{
               this.router.navigate([`projects-members`]);
               alert("Member Updated successfully");
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