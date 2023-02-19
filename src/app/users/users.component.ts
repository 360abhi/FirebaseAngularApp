import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { user } from '../Model/users.model';
import { UserService } from '../Services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  @ViewChild('userform') userForm: NgForm;
  users: user[] = [];

  constructor(private _user: UserService) {}

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
}
