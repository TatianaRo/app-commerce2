
import { ProductService } from 'src/app/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  products$;

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.productService.getAll()
    .subscribe(data => this.products$ = data
      .map(
        product => {
          return <Product>{
            title: product.payload.val()['title'],
            category: product.payload.val()['category'],
            imageUrl: product.payload.val()['imageUrl'],
            price: product.payload.val()['price'],
            key: product.key
          }
        }
      ) );

  }



}
