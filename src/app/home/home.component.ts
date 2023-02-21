import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../Services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FirebaseService],
})

export class HomeComponent implements OnInit {
  constructor(public _firebase: FirebaseService){
  }

  ngOnInit(): void {
    this.onFetchProducts();
  }

  dataTitle = this._firebase.fetchTitle();
  fetching: boolean = false;
  products;

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

  addProduct(id, name, price): void {
    if (this.editmode) {
      this.products[this.editIndex] = {
        id: id,
        name: name,
        price: price,
      };
      this.editmode = false;
    } else {
      if (id.length > 0 && name.length > 0 && price > 0) {
        this.products.push({
          id: id,
          name: name,
          price: price,
        });
      }
    }
    this.id.nativeElement.value = '';
    this.name.nativeElement.value = '';
    this.price.nativeElement.value = '';
    this.saveProduct();
  }

  onRemove(index: number): void {
    this.products.splice(index, 1);
    this.saveProduct();
  }

  saveProduct(): void {
    this._firebase.saveProducts(this.products).subscribe(
      (response) => console.log(response),
      (err) => console.log(err)
    );
  }

  onFetchProducts() {
    this.fetching = true;
    this._firebase.fetchProducts().subscribe(
      (response) => {
        // console.log(response)
        // const data = JSON.stringify(response);
        // this.products = JSON.parse(data);
        this.products = response;
        this.fetching = false;
      },
      (err) => console.log(err)
    );
  }

  @ViewChild('id') id: ElementRef;
  @ViewChild('name') name: ElementRef;
  @ViewChild('price') price: ElementRef;
  editmode: boolean = false;
  editIndex: number;

  onEditProduct(index: number): void {
    this.editIndex = index;
    this.editmode = true;
    this.id.nativeElement.value = this.products[index].id;
    this.name.nativeElement.value = this.products[index].name;
    this.price.nativeElement.value = this.products[index].price;
  }
}
