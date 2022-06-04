import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrls: ['./allproduct.component.scss']
})
export class AllproductComponent implements OnInit {

  constructor(private _product:ProductService) { }
  finalData:any;
  ngOnInit(): void {

    this._product.getAllproduct().subscribe((res:any)=>{
      this.finalData = res.result;
      console.log(res.result);
      console.log(this.finalData);
    })
  }
  addinWishlist(id:any){

  }
}
