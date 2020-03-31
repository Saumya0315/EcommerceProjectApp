import { Component, OnInit, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product:Product[]=[];
  currentCategoryId:number=1;
  thePreviousCategoryId:number=1;
    searchMode:boolean=false;
//new properties for pagination
thePageNumber:number =1;
thePageSize:number =5;
theTotalElements=0;

previousKeyword:string=null;

  constructor(private productService  :ProductService,
    private cartService:CartService,
    private route: ActivatedRoute) { }

  ngOnInit() {
this.route.paramMap.subscribe( ()=>{

  this.listProducts();
});
   
  }
  listProducts()
  {
    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProduct();
    }
    else{
this.handleListProduct();
    }
  }

  handleListProduct(){
    //to check if  category id passed is available
const hashCategoryId:boolean=this.route.snapshot.paramMap.has('id');
if(hashCategoryId){
 
  //get the "id" param string and convert string to a number usin "+"
this.currentCategoryId= +this.route.snapshot.paramMap.get('id');

}
else{
 
  //id not available
  this.currentCategoryId=1;
}

//get the product for given category id


if(this.thePreviousCategoryId!=this.currentCategoryId){
  this.thePageNumber=1;
}

this.thePreviousCategoryId=this.currentCategoryId;
console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

this.productService.getProductListPaginate(this.thePageNumber-1,this.thePageSize,this.currentCategoryId).subscribe(
      this.processResult());
  }

 

  handleSearchProduct(){

    const theKeyword:string=this.route.snapshot.paramMap.get('keyword');

    if(this.previousKeyword!=theKeyword){
      this.thePageNumber=1;
    }
    
    this.previousKeyword=theKeyword;
    console.log(`theKeyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);
    
    this.productService.searchProductPaginate(this.thePageNumber-1,this.thePageSize,theKeyword).subscribe(
          this.processResult());


  }
  processResult(){
    return data=>{
      this.product=data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    };
  }

updatePageSize(pageSize:number)
{
  this.thePageSize=pageSize;
  this.thePageNumber=1;
  this.listProducts();
}


addToCart(theProduct:Product){
  console.log(`Adding to cart: ${theProduct.unitPrice} , ${theProduct.unitsIntock}`);


  const theCartItem= new CartItem(theProduct);
  this.cartService.addToCart(theCartItem);

}


}
