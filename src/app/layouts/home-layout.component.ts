import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{LogoutService} from '../services/logout.service'

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit{

  innerWidth: any;
  opened: boolean;
  isMobileView = false;
  modeType: string;
  logImageUrl: string;
  role;
  user;


  constructor(
    private router: Router,
    private logoutService:LogoutService
  ) { }

  ngOnInit() {
    this.role=localStorage.getItem('userRole');
    this.user=localStorage.getItem('userName');
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 767) {
      this.opened = true;
      this.modeType = 'side';
    } else {
      this.opened = false;
      this.isMobileView = true;
      this.modeType = 'over';
    }
  }

  onUserClick() {
    //this.router.navigate([`logout`]);
    this.logoutService.logoutUser(localStorage.getItem('apiToken')).subscribe((response)=>{
      this.router.navigate([`login`]);
    });
  }

  closeMenu() {
    return false;
  }

  closeMenuOnBackDropClick() {
    if (this.isMobileView) {
      // this.globalState.appDrawer.toggle();
    }
  }
}