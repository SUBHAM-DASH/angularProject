import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrls: ['./allproduct.component.scss']
})
export class AllproductComponent implements OnInit {

  constructor(private _product: ProductService) { }
  finalData: any;
  addColor = false;
  hide = false;
  num:any;
  count=0
  ngOnInit(): void {

    this._product.getAllproduct().subscribe((res: any) => {
      this.finalData = res.result;
    })
  }

  class1={
    'color':'red'
  }
  class2={
    'color':'black'
  }

  addinWishlist(id: any,i:any) {
    this.count+=1;
    console.log("dbhdhd",i,this.count,this.num);
    if(this.num == i && this.count > 1 && this.num != undefined  ){
      this.removeFormWishlist(id);
      this.num='';
    }else{
      this.num = i;
      this._product.addToWishList(id).subscribe((res:any)=>{
        if(res.status == "success"){
          alert(res.message);
        }
      })
    }
  }

  removeFormWishlist(id:any){
    console.log("sgsghy");
    this._product.removefromWishList(id).subscribe((res:any)=>{
      console.log(res);
      if(res){
        alert(res.message);
      }
    })
  }
}
