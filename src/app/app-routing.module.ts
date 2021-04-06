import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';

const routes: Routes = [
  { path: "brands", component:BrandComponent},
  {path:"colors",component:ColorComponent},
  {path:"customers",component:CustomerComponent},
  {path:"cars",component:CarComponent},
  { path: "**", redirectTo: "brands", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
