
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { RegisterFormComponent } from './registration/registration.component';
import { TasksComponent } from './tasks/tasks.component';
import { TasksDetailsComponent } from './task-details/task-details.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageProjectsComponent } from './manage-projects/manage-projects.component';
import { projectMembersComponent } from './project-members/project-members.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { StaticsComponent } from './statics/statics.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tasks',
        component: TasksComponent
      },
      {
        path: 'task-details',
        component: TasksDetailsComponent
      },
      {
        path: 'users',
        component: ManageUsersComponent
      },
      {
        path: 'projects',
        component: ManageProjectsComponent
      },
      {
        path: 'projects-members',
        component: projectMembersComponent
      },
      {
        path: 'user-details',
        component: UserDetailsComponent
      },
      {
        path: 'project-details',
        component: ProjectDetailsComponent
      }, 
      {
        path: 'member-details',
        component: MemberDetailsComponent
      },
      {
        path: 'statics',
        component: StaticsComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'registarion',
    component: RegisterFormComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}