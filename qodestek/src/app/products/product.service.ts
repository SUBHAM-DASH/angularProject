import { config } from './../config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  url = config.API_URL;

  getAllproduct() {
    return this.http.get(this.url+"/api/product/getallproduct");
  }

  addToWishList(data:any){
    return this.http.put(this.url+"/api/product/addtowishlist",{id:data});
  }

  removefromWishList(data:any){
    return this.http.post(this.url+"/api/product/removewishlistproduct",{id:data})
  }

  allwishlistedProduct(){
    return this.http.get(this.url+"/api/product/allwishlistproducts");
  }
}
