import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db : AngularFireDatabase, private shoppingCartService : ShoppingCartService) { }

  placeOrder(order){
    let result = this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
  
  getOrderById(userId){
    
  }

  getAll(){
    return this.db.list('/orders').valueChanges();
  }
}
