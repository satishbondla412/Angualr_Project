import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { RegisterService } from '../services/register.service';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registrationForm: FormGroup;
  private formSubmitAttempt: boolean;
  loading = false;
  submitted = false;
  registerdata ={}
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private registerService: RegisterService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmpPassword: ['', Validators.required],
      email: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields 
  get registerForm() { return this.registrationForm.controls; }

  cancel(){
    this.router.navigate([`login`]);
  }
  createProfile(){
    let obj={
      name:this.registrationForm.value.userName,
      email:this.registrationForm.value.email,
      password:this.registrationForm.value.password,
      password_confirmation:this.registrationForm.value.confirmpPassword,
      
    }
    this.spinner.show();
    this.registerService.registerUser(obj).subscribe((userresponse)=>{
      this.router.navigate([`login`]);
      this.spinner.hide();
      alert("registration successfull");
      
    },
    err => {
      this.spinner.hide();
      if (err.error) {
        alert(err.error.message);
      }
    });

  }
}
