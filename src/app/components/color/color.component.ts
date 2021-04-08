import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors: Color[] = []
  cars: Car[] = []

  constructor(private colorService: ColorService, private carService: CarService) { }


  ngOnInit(): void {
    this.getColors()
  }
  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
      console.log("component")
      console.log(this.colors)
    })
  }
  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColorId(colorId).subscribe(response => {
      this.cars = response.data
      console.log(this.cars)
    })

  }
}