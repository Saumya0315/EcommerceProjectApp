import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product:Product=new Product;


  constructor(private productService  :ProductService,
    private cartService :CartService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(()=>{
      this.getProductDetails();
    });
    
  }
  addToCart(){
    console.log(`Adding to cart: ${this.product.unitPrice} , ${this.product.unitsIntock}`);
  
  
    const theCartItem= new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  
  }
  


  getProductDetails(){

    const theProductId:number=+this.route.snapshot.paramMap.get('id');
    this.productService.getProducts(theProductId).subscribe(

      data=>{
        this.product=data;
      }
    )
  }



}
