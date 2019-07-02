import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import {filter, map} from 'rxjs/operators';

import { UserService } from '../shared/usershared/user.service';
import { ProjectService } from '../shared/projectshared/project.service';
import { TaskService } from '../shared/taskshared/task.service';
import { User } from '../shared/usershared/user.model';
import { Task } from '../shared/taskshared/task.model';
import { Project } from '../shared/projectshared/project.model';
import { ParentTask } from '../shared/taskshared/parent-task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  users: User[]=[];
  projects: Project[]=[];
  parentTasks: ParentTask[]=[];
  task: object = {};

  disable: boolean = false;
  editTaskFlag : boolean = false;
  

  constructor(private userService: UserService, private projectService: ProjectService, private taskService: TaskService,
    router:Router, route:ActivatedRoute) { 
    
    if(this.taskService.task != null){
      this.task = this.taskService.task;
      this.taskService.task = null;
      this.editTaskFlag = this.taskService.editTaskFlag;
      this.taskService.editTaskFlag = false;
    }
  }

  ngOnInit() {
      this.getUsers();
      this.getProjects();
      this.getParentTask();
  }
 
  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users)
  }

  getProjects(): void{
   this.projectService.getProjects()
  .subscribe(projects => this.projects = projects)
  }

  addTask(task: Task): void {
   
    this.taskService.addTask(task).subscribe();
  }

  editTask(task : Task): void {
    this.taskService.editTask(task).subscribe();
    this.editTaskFlag = false;
  }

  changeEvent(event: boolean): void{
    this.disable = event;
  }

  getParentTask(): void{
    this.taskService.getParentTask()
    .subscribe(parentTasks => this.parentTasks = parentTasks)
  }


}
