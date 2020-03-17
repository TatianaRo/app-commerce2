import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  
  products$;
  product;


  constructor(private productService : ProductService,
              private route : ActivatedRoute,
     ) { 
    //this.products = this.productService.getProducts();

     let id = this.route.snapshot.paramMap.get('id');
     if (id) this.productService.getProduct(id).
  }
  ngOnInit(): void {

   //this.products$ = this.productService.getAll();}

   this.productService.getAll().subscribe(data =>{
    this.products$ = data
    
    .map( e => {
      return{key: e.payload.key, ...e.payload.val() as {} } ;
    })
  });
}

 





 
   

  }