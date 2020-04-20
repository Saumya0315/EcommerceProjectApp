import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

cartItems:CartItem[]=[];
totalPrice:number=0;
totalQuantity:number=0;


  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {

//get a handle to the cart items

this.cartItems=this.cartService.cartItems;
//subscribe to the cart total price
this.cartService.totalPrice.subscribe(
  data=>this.totalPrice=data
);


//subscribe t the cart totalQuantity
this.cartService.totalQuantity.subscribe(
  data=> this.totalQuantity=data
);
//compute cart toal price and quntity
this.cartService.computeCartTotals();

  }
  increamentQuantity(theCartItem : CartItem)
  {
this.cartService.addToCart(theCartItem);
  }
  decreamentQuantity(theCartItem : CartItem)
  {
    this.cartService.decreamentQuantity(theCartItem);
    
    
  }
  remove(theCartItem : CartItem)
  {
    this.cartService.remove(theCartItem);
    
    
  }

}
