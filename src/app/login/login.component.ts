import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AuthService } from './../auth/auth.service';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private formSubmitAttempt: boolean;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loginService: LoginService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

 

  // convenience getter for easy access to form fields
  get userForm() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
  
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
    this.formSubmitAttempt = true;
  }

  goToRegistration(){
    this.router.navigate([`registarion`]);
  }
}
