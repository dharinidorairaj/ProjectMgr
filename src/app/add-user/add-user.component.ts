import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../shared/usershared/user.model';
import { UserService } from '../shared/usershared/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  editUserFlag: boolean =false;
  users: User[]=[];
  user: Object ={};

  constructor(private userService: UserService) {
    }


  ngOnInit() {
    this.getUsers();
  }

  onSubmit(user: User): void{    
    if(this.editUserFlag){
      this.editUserFlag = false;
      this.users = this.users.filter(u => u !== user);
      this.userService.updateUser(user).subscribe(
        user => {this.users.push(user);})

    }else{
      this.addUser(user);
    }
  }

  editUser(user: User): void{
    this.editUserFlag = true;
    this.user = user;
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users)
  }

  addUser(user: User): void{
    this.userService.addUser(user)
      .subscribe(user => {
        this.users.push(user);
      });
  }

  deleteUser(user: User): void{    
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user.userId).subscribe();
  }

  sortByFirstName(): void{
     this.users.sort((a, b) => {
        if (a.firstName < b.firstName) return -1;
        else if (a.firstName > b.firstName) return 1;
        else return 0;
      });
  }

  sortByLastName(): void{
     this.users.sort((a, b) => {
        if (a.lastName < b.lastName) return -1;
        else if (a.lastName > b.lastName) return 1;
        else return 0;
      });
  }

  sortById(): void{
     this.users.sort((a, b) => { 
        if (a.userId < b.userId) return -1;
        else if (a.userId > b.userId) return 1;
        else return 0;
      });
  }


}
