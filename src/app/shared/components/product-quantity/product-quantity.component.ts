import { Product } from 'app/shared/models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  @Input('product') product : Product;
  @Input ('shopping-cart') shoppingCart;

  constructor(private cardService : ShoppingCartService) { }

  addToCart(){
    this.cardService.addToCart(this.product);
    }

  removeFromCart(){
      this.cardService.removeFromCart(this.product);
    } 

  
}
