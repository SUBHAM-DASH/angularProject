import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AuthGuard } from './../auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllproductComponent } from './components/allproduct/allproduct.component';

const routes: Routes = [
  { path: "allproduct", component: AllproductComponent, canActivate: [AuthGuard] },
  { path: "wishlisted", component: WishlistComponent, canActivate: [AuthGuard] },
  { path: "", redirectTo: "allproduct", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
