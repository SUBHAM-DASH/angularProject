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
}
