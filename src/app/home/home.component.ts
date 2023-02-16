import { Component } from '@angular/core';
import { FirebaseService } from '../Services/firebase.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FirebaseService]
 
})
export class HomeComponent {
  constructor(public _firebase:FirebaseService) {}

  uname = '';
  uid ='';
  uprice  = 0;
  products = [
    {
      id: 'p1',
      name: 'Mobile',
      price: 5000,
    },
    {
      id: 'p2',
      name: 'TV',
      price: 55000,
    },
    {
      id: 'p3',
      name: 'Flip Mobile',
      price: 24000,
    },
  ];

  addProduct(id, name, price): void {
    if (id.length > 0 && name.length > 0 && price> 0) {
      this.products.push({
        id: id,
        name: name,
        price: price,
      });
    }
    this.uid = '';
    this.uname ='';
    this.uprice = 0;
  }

  onRemove(index: number): void {
    this.products.splice(index,1);
  }

  saveProduct(): void {
    this._firebase.saveProducts(this.products).subscribe(
      (response) => console.log(response),
      (err) => console.log(err)
    )
  }
}
