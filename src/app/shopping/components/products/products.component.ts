import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ProductService } from 'app/shared/services/product.service';
import { Component, OnInit} from '@angular/core';
import { Product } from 'shared/models/product';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from 'shared/models/shopping-cart';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Product[] = [];
  filteredProducts : Product[] = [];
  category : string;
  cart$ : Observable<ShoppingCart>;
  

  constructor(private productService : ProductService,
              private route : ActivatedRoute,
              private shoppingCartService : ShoppingCartService) { 
              
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();

  }

  private populateProducts(){       
    this.productService.getAll()
        .subscribe(data => { this.products = data
          .map(
             product => {
            return <Product>{
            title: product.payload.val()['title'],
            category: product.payload.val()['category'],
            imageUrl: product.payload.val()['imageUrl'],
            price: product.payload.val()['price'],
            key: product.key}          
                      
            } )  
          
       this.route.queryParamMap.subscribe(params =>{
      this.category = params.get('category') ;
      this.applyFilter(); })   

      }) ;

  }

  private applyFilter(){
    this.filteredProducts = (this.category) ?
    this.products.filter( p => p.category === this.category) :
    this.filteredProducts = this.products;

  }



  


}
