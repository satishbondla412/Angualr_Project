import { projectMembersComponent } from './project-members/project-members.component';

import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './header/header.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterFormComponent } from './registration/registration.component';
import { TasksComponent } from './tasks/tasks.component';
import { TasksDetailsComponent } from './task-details/task-details.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageProjectsComponent } from './manage-projects/manage-projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { StaticsComponent } from './statics/statics.component';
import {ChartsModule,ThemeService} from 'ng2-charts';
import { ProjectsService } from './services/projects.services';
import { RegisterService } from './services/register.service';
import {LoginService} from './services/login.service';
import {UsersService} from './services/users.service';
import {TasksService} from './services/tasks.service';
import {ProjectMemberService} from './services/projectMember.service';
import {HttpClient,HttpClientModule } from '@angular/common/http';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import {NgxSpinnerModule} from 'ngx-spinner';
import {StaticsService} from './services/statics.service';
import { LogoutComponent } from './logout/logout.component';
import { LogoutService } from './services/logout.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    HeaderComponent,
    TasksComponent,
    SidemenuComponent,
    RegisterFormComponent,
    TasksDetailsComponent,
    ManageUsersComponent,
    ManageProjectsComponent,
    projectMembersComponent,
    ProjectDetailsComponent,
    MemberDetailsComponent,
    UserDetailsComponent,
    StaticsComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxSpinnerModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [AuthService, AuthGuard,ThemeService,ProjectsService,RegisterService,LoginService,
    UsersService,TasksService,ProjectMemberService,StaticsService,LogoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }