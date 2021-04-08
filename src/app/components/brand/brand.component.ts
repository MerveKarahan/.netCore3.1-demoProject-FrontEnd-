import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands: Brand[] = []
  cars:Car[]=[]
  constructor(private brandService: BrandService, private carService: CarService) { }

  ngOnInit(): void {
    this.getBrand()

  }

  getBrand() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
      console.log("component")
      console.log(this.brands)
    })

  }
getCarsByBrandId(brandId:number){
  this.carService.getCarsByBrandId(brandId).subscribe(response =>{
    this.cars= response.data 
    console.log(this.cars)
  })
}
}
