import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDTO } from 'src/app/models/carDTO';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';
import { RentalComponent } from '../../rental/rental.component';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetail!: CarDTO
  customer!: Customer
  rental:Rental = {} as Rental


  constructor(private carService: CarService, private activatedRoute: ActivatedRoute,
     private localStorageService: LocalStorageService, private customerService:CustomerService, 
     private userService:UserService, private rentalService:RentalService,private toastrService: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCarDetail(params["carId"])
      this.getCustomer(this.userService.getUserId())
      this.rental.carId=parseInt(params["carId"])
     
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
      this.rental.customerId=response.data.customerId
    })
  }

  RentTheCar(){
    this.rentalService.checkCarAvailable(this.rental).subscribe(response =>{
      if (response.success) {          
        return this.router.navigate(["/payment"])
      }
      else {
        return this.toastrService.error(response.message, "Kiralama İsteği Başarısz!")
      }

    },error=>{
      console.log(error)
      return this.toastrService.error(error.error.message)
    })   
  }
}
