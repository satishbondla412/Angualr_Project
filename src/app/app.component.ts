import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('appDrawer', { static: false }) appDrawer: ElementRef;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  innerWidth: any;
  opened: boolean;
  isMobileView = false;
  modeType: string;
  logImageUrl: string;


  constructor() { }

  ngOnInit() {
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
    //this.router.navigate([`clients/1/profile`]);
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
