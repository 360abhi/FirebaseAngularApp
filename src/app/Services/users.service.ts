import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { user } from '../Model/users.model';

@Injectable({
  providedIn: 'root'
}) 

export class UserService {

    url = 'https://datafetchingapp-default-rtdb.firebaseio.com/users.json'

    constructor(private http: HttpClient){}
    
    saveProducts(users: user[]) {
        return this.http.post(this.url,users);
    }

    fetchUsers() {
      return this.http.get(this.url);
    }
}