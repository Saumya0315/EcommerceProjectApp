import { Component, OnInit, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product:Product[];
  currentCategoryId:number;

  constructor(private productService  :ProductService,
    private route: ActivatedRoute) { }

  ngOnInit() {
this.route.paramMap.subscribe( ()=>{

  this.listProducts();
});
   
  }
  listProducts()
  {
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
///get the product for given category id


    this.productService.getProductList(this.currentCategoryId).subscribe(

      data=>{
        this.product=data;
      }
    )
  }


}
