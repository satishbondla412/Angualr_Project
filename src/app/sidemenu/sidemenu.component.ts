
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  events: string[] = [];
  opened: boolean; isMobileView = false;
  appDrawer: any;
  currentEnvironment: any;
  showClients: boolean; 
  showFoods= false;
  role:any;
  activeNav;
  constructor(
    private route: Router,
    private authService: AuthService
    ) {
  }

  ngOnInit() {
    this.activeNav=this.authService.activeMenu;
    this.currentEnvironment = environment;
    const innerWidth = window.innerWidth;
    if (innerWidth < 768) {
      this.isMobileView = true;
    }

    this.role=localStorage.getItem('userRole');
  }

  close(reason: string) {
  }

  logout() {
    this.authService.logout();
  }

  clickToNavigate(routeLink: any, from?) {
    if (from == 'profile') {
  
    }
    if (this.isMobileView) {
    } else {
    }
  }

}
