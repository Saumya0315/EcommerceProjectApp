import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems:CartItem[]=[];
  totalPrice:Subject<number>=new Subject<number>();
  totalQuantity:Subject<number>=new Subject<number>();


  constructor() { }


  addToCart(theCartItem:CartItem)
  {

//check if we already have a item in our cart
let alreadyExistsInCart:boolean=false;
let existingCartItem:CartItem=undefined;

if(this.cartItems.length>0){

//find the item in cart based on item id
for(let tempCartItem of this.cartItems){
  if(tempCartItem.id==theCartItem.id)
  {
    existingCartItem=tempCartItem;
    break;
  }
}

//existingCartItem=this.cartItems.find(tempCartItem=>tempCartItem.id=theCartItem.id);


//chck if we found it
alreadyExistsInCart=(existingCartItem!=undefined);
}
if(alreadyExistsInCart)
{
  //increament the quantity
  existingCartItem.quantity++;
}
else{
  //just add the item to array
  this.cartItems.push(theCartItem);
}

//compute cart total price and toatal quantity
this.computeCartTotals();



  }
  computeCartTotals() {

let totalPriceValue:number=0;
let totalQuantityValue:number=0;
for(let currentCartItem of this.cartItems){
  totalPriceValue+=currentCartItem.quantity*currentCartItem.unitPrice;
  totalQuantityValue+=currentCartItem.quantity
}
//publish the new values ... all subscribers will recieve data
this.totalPrice.next(totalPriceValue);
this.totalQuantity.next(totalQuantityValue);

this.logCartData(totalPriceValue ,totalQuantityValue);



  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
console.log('Contents of the cart');

for(let tempCartData of this.cartItems){
  const subTotalPrice=tempCartData.quantity*tempCartData.unitPrice;
  console.log(`name : ${tempCartData.name}, quantiy: ${tempCartData.quantity} ,unitPrice: ${tempCartData.unitPrice} ,subtotalPrice: ${subTotalPrice}`);
}
console.log(`totalPrice:${totalPriceValue} , totalQuantity:${totalQuantityValue}`);
console.log(`----------------`);


  }
  decreamentQuantity(theCartItem:CartItem)
  {
theCartItem.quantity--;

if(theCartItem.quantity==0)
{
  this.remove(theCartItem);
}
else{
  this.computeCartTotals();
}
  }

  remove(theCartItem:CartItem)
  {
//get index of item in the array
const itemIndex=this.cartItems.findIndex(tempCartItem => tempCartItem.id=theCartItem.id);

//if found remove the item from the array in given index

if(itemIndex> -1)
{ this.cartItems.splice(itemIndex, 1);
this.computeCartTotals();
}

  }



}
