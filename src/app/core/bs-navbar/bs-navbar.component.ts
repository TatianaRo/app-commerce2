import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{

    
    //shoppingCartItemCount : number;
    cart$: Observable<ShoppingCart>;
   
    constructor(public auth : AuthService,
                private shoppingCartService : ShoppingCartService) { 
   }

  logout(){
      this.auth.AuthLogout();
  }

  async ngOnInit(){
    this.cart$ = await this.shoppingCartService.getCart();
     }
}

//inplementação do onInit antes de delegar a responsabilidade para o obj pela contagem
/* let cart$ = await this.shoppingCartService.getCart();
    cart$.snapshotChanges().subscribe(cart =>{
      this.shoppingCartItemCount = 0;
      let items = cart.payload.val()['items'];
      console.log(items);
     for (let productId in items)
       this.shoppingCartItemCount += items[productId].quantity;  }) */