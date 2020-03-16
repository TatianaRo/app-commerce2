import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/product.model';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[];

  constructor(private productService : ProductService) { }

  ngOnInit(): void {}

  /* ngOnInit(): void {
    this.productService.getProducts().subscribe(data =>{
      this.products = data
      
      .map( e => {
        return{id: e.payload.doc.id, ...e.payload.doc.data() as Product } ;
      })
    });
  }


create(product : Product){
    this.productService.createProduct(product);
}

update(product : Product) {
  this.productService.updateProduct(product);
}

delete(id: string) {
  this.productService.deleteProduct(id);
} */

}
