import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShoppingCart } from '../shopping-cart';
import { Subscription } from 'rxjs';
import { date } from 'ngx-custom-validators/src/app/date/validator';
import { Order } from '../order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shippingForm : FormGroup;
  cart : ShoppingCart;
  cartSubscription : Subscription;
  userSubscription : Subscription;
  userId: string;

  constructor(private router : Router,
              private fb : FormBuilder, 
              private shoppingCartService : ShoppingCartService,
              private orderService : OrderService,
              private authService : AuthService) { }

  async ngOnInit(){
    this.formBuilder();

    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
    }

    ngOnDestroy(){
      this.cartSubscription.unsubscribe();
      this.userSubscription.unsubscribe();
    }

  async  placeOrder(shipping){
      let order = new Order(this.userId,shipping,this.cart)
      let result = await this.orderService.placeOrder(order);
      this.router.navigate(['/order-success/' + result.key]);

  }

  
 formBuilder(){
    this.shippingForm = this.fb.group({
      name: ['',Validators.required],
      adressOne: ['',Validators.required],
      adressTwo: ['',Validators.required],
      city: ['',Validators.required]
    })
  }
  get name(){
    return this.shippingForm.get('name');
  }

  get adressOne(){
    return this.shippingForm.get('adressOne');
  }

  get adressTwo(){
    return this.shippingForm.get('adressTwo');
  }
  get city(){
    return this.shippingForm.get('city');
  }
}
