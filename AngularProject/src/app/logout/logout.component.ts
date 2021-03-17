import { Component, OnInit } from '@angular/core';
import {LogoutService} from '../services/logout.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private logoutService : LogoutService
  ) { }

  ngOnInit() {

    localStorage.setItem('state','logout');
  }

}
