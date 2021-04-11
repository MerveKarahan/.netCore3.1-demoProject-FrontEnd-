import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentSuccessComponent } from './components/rent-success/rent-success.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: "brands", component: BrandComponent },
  { path: "colors", component: ColorComponent },
  { path: "customers", component: CustomerComponent },
  { path: "cars", component: CarComponent },
  { path: "cars/detail/:carId", component: CarDetailComponent },
  { path: "rentals", component: RentalComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {path:"profile",component:UserProfileComponent},
  {path:"brands/add",component:BrandAddComponent},
  {path:"changepassword",component:ChangePasswordComponent},
  {path:"colors/add",component:ColorAddComponent},
  {path:"cars/add",component:CarAddComponent},
  {path:"cars/update/:carId",component:CarUpdateComponent},
  {path:"payment",component:PaymentComponent},
  {path:"rentSuccess" , component:RentSuccessComponent},
  {path:"colors/update/:colorId",component:ColorUpdateComponent},
  {path:"brands/update/:brandId",component:BrandUpdateComponent},
  { path: "**", redirectTo: "cars", pathMatch: "full" }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
