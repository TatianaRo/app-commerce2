import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { Subscription } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
  @Input('cart') cart : ShoppingCart; 
  shippingForm : FormGroup;
  userSubscription : Subscription;
  userId: string;

  constructor(private router : Router ,
              private fb : FormBuilder,
              private orderService : OrderService, 
              private authService : AuthService) { }

  ngOnInit(): void {
    this.formBuilder();
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  ngOnDestroy(){
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
