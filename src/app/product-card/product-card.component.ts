import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from 'src/app/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product : Product;
  @Input('show-actions') showActions = true;
  @Input ('shopping-cart') shoppingCart : ShoppingCart;

  constructor(private cardService : ShoppingCartService) { }

  addToCart(){
    this.cardService.addToCart(this.product);
    }

}
