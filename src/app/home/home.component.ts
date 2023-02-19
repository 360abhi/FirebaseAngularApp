import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../Services/firebase.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FirebaseService]
 
})
export class HomeComponent  implements OnInit{
  constructor(public _firebase:FirebaseService) {}

  ngOnInit(): void {
      this.onFetchProducts();
  }

  dataTitle = this._firebase.fetchTitle();

  fetching:boolean = false;
  uname = '';
  uid ='';
  uprice  = 0;
  products = [
    // {
    //   id: 'p1',
    //   name: 'Mobile',
    //   price: 5000,
    // },
    // {
    //   id: 'p2',
    //   name: 'TV',
    //   price: 55000,
    // },
    // {
    //   id: 'p3',
    //   name: 'Flip Mobile',
    //   price: 24000,
    // },
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

  onFetchProducts(){
    this.fetching = true;
    this._firebase.fetchProducts()
    .subscribe(
      (response) =>{
        // console.log(response)
        const data = JSON.stringify(response);
        this.products = JSON.parse(data);
        this.fetching = false;
      } 
      ,
      (err) => console.log(err)
    )
  }
}
