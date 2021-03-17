import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userDeatilsForm: FormGroup;
  userDeatils;
  assignees;
  userRoles;
  isFromCreate = false;
  submitted = false;
  userID: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.userRoles = [{ id: 1, name: "admin" }, { id: 2, name: "manager" }, { id: 3, name: "user" }];
    this.route.queryParams.subscribe(params => {
      this.userID = params['id']
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
    if (this.userID) {
      this.usersService.getOneUser(this.userID, localStorage.getItem('apiToken')).subscribe((respDeatils) => {
        this.userDeatils = respDeatils;
        this.formBuilder(this.userDeatils);
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
      this.userDeatils = null;
      this.formBuilder(this.userDeatils);
      this.spinner.hide();
    }
  }

  formBuilder(data) {
    let details = data ? data : null;
    if (this.userID) {
      this.userDeatilsForm = this.fb.group({
        assignee: [(details && details.name) ? details.name : '', Validators.required],
        loginId: [(details && details.id) ? details.id : '', Validators.required],
        role: [(details && details.user_role) ? details.user_role : '', Validators.required],
        email: [(details && details.email) ? details.email : '', Validators.required]
      })
    } else {
      this.userDeatilsForm = this.fb.group({
        assignee: [(details && details.name) ? details.name : '', Validators.required],
        password: [(details && details.password) ? details.password : '', Validators.required],
        role: [(details && details.user_role) ? details.user_role : '', Validators.required],
        email: [(details && details.email) ? details.email : '', Validators.required]
        // password: [(details && details.title) ? details.title : '', Validators.required],
        //  confirmPassword: [(details && details.title) ? details.title : '', Validators.required]
      })
    }

  }
  // convenience getter for easy access to form fields
  get usersForm() { return this.userDeatilsForm.controls; }

  assigneeChange(e) {

  }

  taskStatusChange(e) {

  }

  cancel() {
    this.router.navigate([`users`]);
  }

  save() {
    this.submitted = true;
    if (this.userDeatilsForm.valid) {
      let formValue = this.userDeatilsForm.value;
      let formReqData;
      if (this.userID) {
        formReqData = {
          api_token: localStorage.getItem('apiToken'),
          id: formValue.loginId,
          name: formValue.assignee,
          email: formValue.email,
          user_role: formValue.role
        };
      } else {
        formReqData = {
          api_token: localStorage.getItem('apiToken'),
          name: formValue.assignee,
          email: formValue.email,
          user_role: formValue.role,
          password: formValue.password
        };
      }
      if (!this.userID) {
        debugger;
        this.usersService.createUser(formReqData).subscribe(() => {
          this.router.navigate([`users`]);
          debugger;
          alert("User Created successfully");
        },
        err => {
          this.spinner.hide();
          if (err.error) {
            alert(err.error.message);
          }
        });
      }
      else {
        this.usersService.updateUser(this.userID, formReqData).subscribe((response) => {
          this.router.navigate([`users`]);
          alert("User updated successfully");
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
