import { Component, OnInit } from '@angular/core';
import { CarDTO } from 'src/app/models/carDTO';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  
  cars:CarDTO[]=[]
  constructor(private carService:CarService) { } 

  ngOnInit(): void {
    this.getCarDTO()
  }

  getCarDTO(){
    this.carService.getCarDTO().subscribe(response=>{
    this.cars=response.data
    console.log("component")
    console.log(this.cars)
    })
      }

}
