import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserService }   from './shared/usershared/user.service';
import { ProjectService } from './shared/projectshared/project.service'
import { TaskService } from './shared/taskshared/task.service';



import {FilterPipe} from './filter.pipe';
import {SortByPipe} from './sort.pipe';
import {ProjectFilterPipe} from './project-filter.pipe';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    FilterPipe,
    SortByPipe,
    ProjectFilterPipe,
    AddProjectComponent,
    AddTaskComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService,ProjectService,TaskService],
  bootstrap: [AppComponent]
}) 
export class AppModule { }
