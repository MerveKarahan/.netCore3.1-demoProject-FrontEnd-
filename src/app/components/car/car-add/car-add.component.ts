import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  addForm!: FormGroup
  brands:Brand[]=[]
  colors:Color[]=[]
  selectedBrand=0
  selectedColor=0
  
  constructor(private toastrService: ToastrService, private formBuilder: FormBuilder,
     private router: Router, private carService:CarService, private brandService:BrandService, private colorService:ColorService) { }
  
  ngOnInit(): void {
    this.createAddForm()
    this.getColors()
    this.getBrands()
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
    })
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
    })
  }
  createAddForm() {
    this.addForm = this.formBuilder.group({
      carName: ["", Validators.required],
      modelYear:["", Validators.required],
      colorId:["",Validators.required],
      dailyPrice: ["", Validators.required],
      brandId:["", Validators.required],
      description: ["", Validators.required],
      minFindexPoint:["",Validators.required]
    })
  }
  add() {
    if (this.addForm.valid) {
      let addModel = Object.assign({}, this.addForm.value)
      console.log(addModel)
      this.carService.addCar(addModel).subscribe(response => {

        if (response.success) {
          
          return this.router.navigate(["/cars"]).then(()=>{
            this.toastrService.success(response.message, "Kayıt Başarılı")
          
          })
        }
        else {
          return this.toastrService.error(response.message, "Kayıt Başarısız!")
        }

      },error=>{
        console.log(error)
        return this.toastrService.error(error.error.Message)
      })
      

    }
    else {
      return this.toastrService.error("Model valid değil", "HATA!!")
    }
    return
  }
  

}

