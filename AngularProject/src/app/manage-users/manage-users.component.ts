import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  taskDeatilsForm: FormGroup;
  taskDeatils;
  users;
  deleteId;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    localStorage.setItem('state', 'users');
    this.spinner.show();
    this.usersService.getUsers(localStorage.getItem('apiToken')).subscribe((resp) => {
      this.users = resp;
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
  createUser() {
    this.router.navigate([`user-details`], { queryParams: { id: null } });
  }
  edit(id) {
    this.router.navigate([`user-details`], { queryParams: { id: id } });

  }
  delete(id) {
    this.deleteId = id;
    this.usersService.deleteUser(this.deleteId, localStorage.getItem('apiToken')).subscribe((response) => {
      this.usersService.getUsers(localStorage.getItem('apiToken')).subscribe((tasksResp) => {
        this.users = tasksResp;
        alert("User deleted successfully");
      },
        err => {
          if (err.error) {
            alert(err.error.message);
          }
        });
     },
    err => {
      if (err.error) {
        alert("Cannot delete the user. Check dependency");
      }
    });
    
  }
}