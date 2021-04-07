import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDTO } from 'src/app/models/carDTO';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
carDetail!:CarDTO
  constructor(private carService:CarService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
this.activatedRoute.params.subscribe(params=>{
  this.getCarDetail(params["carId"])
})
  }

  getCarDetail(carId:number){
    console.log("carId:"+carId)
    this.carService.getCarById(carId).subscribe(response=>{
      console.log(response)
      this.carDetail=response.data

      console.log(this.carDetail)
    })
  }
}
