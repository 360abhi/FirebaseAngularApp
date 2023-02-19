import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { user } from '../Model/users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  @ViewChild('userform') userForm : NgForm;

  onAddUser(userData:user) {
    console.log(userData)
  }
}
