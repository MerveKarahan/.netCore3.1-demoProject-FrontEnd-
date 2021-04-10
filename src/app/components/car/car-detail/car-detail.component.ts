import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDTO } from 'src/app/models/carDTO';
import { Customer } from 'src/app/models/customer';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetail!: CarDTO
  customer!: Customer
  carId!:number
  constructor(private carService: CarService, private activatedRoute: ActivatedRoute,
     private localStorageService: LocalStorageService, private customerService:CustomerService, private userService:UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCarDetail(params["carId"])
      this.carId=params["carId"]
      this.getCustomer(this.userService.getUserId())
      
    })
  }

  getCarDetail(carId: number) {
    console.log("carId:" + carId)
    this.carService.getCarById(carId).subscribe(response => {
      console.log(response)
      this.carDetail = response.data

      console.log(this.carDetail)
    })
  }
  loggedIn() {
    return this.localStorageService.getToken() != null ? true : false
  }
  getCustomer(userId:number){
    this.customerService.getCustomerByUserId(userId).subscribe(response=>{
      this.customer=response.data
    })
  }

}
