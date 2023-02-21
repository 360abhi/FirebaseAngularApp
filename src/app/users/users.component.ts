import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { user } from '../Model/users.model';
import { UserService } from '../Services/users.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})

export class UsersComponent implements OnInit {
  @ViewChild('userform') userForm: NgForm;
  users: user[] = [];

  constructor(private _user: UserService) {}

  ngOnInit(): void {
      this.fetchUsers();
  }

  onAddUser(userData: user) {
    // console.log(userData)
    if (userData.name.length > 0 && userData.technology.length > 0) {
      this.users.push(userData);
      this._user.saveProducts(this.users).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }

  fetchUsers() {
    this._user.fetchUsers()
    .pipe(map(resData=> {
      const userArray = [];
      for(const key in resData){
        if(resData.hasOwnProperty(key)){
          userArray.push({
            userId:key, ...resData[key]
          })
          console.log(userArray)
        }
      }
      return userArray;
    }))
    .subscribe(
      response=>this.users = response
    )
  }
}
