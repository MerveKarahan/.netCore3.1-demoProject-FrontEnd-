import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { CarDTO } from 'src/app/models/carDTO';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  brands: Brand[] = []
  colors: Color[] = []
  selectedBrand = 0
  selectedColor = 0

  cars: CarDTO[] = []
  filteredCars:CarDTO[]=[]
  filterText = ""
  constructor(private carService: CarService, private colorService: ColorService, private brandService: BrandService) { }

  ngOnInit(): void {
    this.getCarDTO()
    this.getBrands()
    this.getColors()
  }
  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }
  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }
  getCarDTO() {
    this.carService.getCarDTO().subscribe(response => {
      this.cars = response.data
      this.filteredCars=response.data
      console.log("component")
      console.log(this.cars)
    })
  }

  filterCars(){
    if(this.selectedColor>0 &&this.selectedBrand>0){
      this.filteredCars=this.cars.filter(q=>q.colorId==this.selectedColor && q.brandId==this.selectedBrand)
    }
   else if(this.selectedColor>0 &&this.selectedBrand==0){
    this.filteredCars=this.cars.filter(q=>q.colorId==this.selectedColor )
   }
   else if(this.selectedColor==0 &&this.selectedBrand>0){
    this.filteredCars=this.cars.filter(q=>q.brandId==this.selectedBrand )
   }
   else{
     this.filteredCars=this.cars
   }
  }
  
}
