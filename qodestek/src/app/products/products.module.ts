import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AllproductComponent } from './components/allproduct/allproduct.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
@NgModule({
  declarations: [
    AllproductComponent,
    WishlistComponent,

  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PaginationModule.forRoot()
  ]
})
export class ProductsModule { }
