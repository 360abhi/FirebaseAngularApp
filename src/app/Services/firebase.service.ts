import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
}) 

export class FirebaseService {

  url = 'https://datafetchingapp-default-rtdb.firebaseio.com/products.json'

  constructor(private http: HttpClient) { }

  saveProducts(products: any[])  {
    return this.http.put(this.url,products);
  }

  fetchProducts(){
    return this.http.get(this.url);
  }

  fetchTitle() {
    return this.http.get('https://datafetchingapp-default-rtdb.firebaseio.com/dataTitle.json');
  }

}
