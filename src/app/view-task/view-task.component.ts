import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { Task } from '../shared/taskshared/task.model';
import { Project } from '../shared/projectshared/project.model';
import { TaskService } from '../shared/taskshared/task.service';
import { ProjectService } from '../shared/projectshared/project.service';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  projects: Project[]=[];
  tasks: Task[]=[];

  constructor(private taskService: TaskService, private projectService: ProjectService,private router:Router) { this.getAllTask();}

  ngOnInit() {
  	this.getProjects();

  }

  getProjects(): void{
   this.projectService.getProjects()
  .subscribe(projects => this.projects = projects)
  }

   getTasksByProject(id: number): void{
    this.taskService.getTasksByProject(id)
    .subscribe(tasks => this.tasks = tasks)
  }
  getAllTask():void{
    this.taskService.getAllTasks()
    .subscribe(tasks => this.tasks = tasks)
  }

  editTask(task: Task): void{
    this.taskService.task = task;
    this.taskService.editTaskFlag = true;
    this.router.navigate(['/add-task']);
  }


  sortByStartDate(): void{
     this.tasks.sort((a, b) => {
        if (a.startDate < b.startDate) return -1;
        else if (a.startDate > b.startDate) return 1;
        else return 0;
      });
  }

  sortByEndDate(): void{
     this.tasks.sort((a, b) => {
        if (a.endDate < b.endDate) return -1;
        else if (a.endDate > b.endDate) return 1;
        else return 0;
      });
  }

  sortByPriority(): void{
     this.tasks.sort((a, b) => {
        if (a.priority < b.priority) return -1;
        else if (a.priority > b.priority) return 1;
        else return 0;
      });
  } 

  sortByCompleted(): void{
    
  }


}
