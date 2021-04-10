import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  updateForm!: FormGroup
  brands:Brand[]=[]
  colors:Color[]=[]
  selectedBrand=0
  selectedColor=0
  
  constructor(private toastrService: ToastrService, private formBuilder: FormBuilder,
     private router: Router, private carService:CarService, private brandService:BrandService,
      private colorService:ColorService,private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.createUpdateForm()
    this.getColors()
    this.getBrands()
    this.activatedRoute.params.subscribe(params => {
      this.loadCar(params["carId"]);
    });
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
  loadCar(carId: number) {
    this.carService.getCarById(carId).subscribe(response => {
      this.updateForm.controls['carId'].setValue(parseInt(response.data.carId.toString()));
      this.updateForm.controls['carName'].setValue(response.data.carName.toString());
      this.updateForm.controls['description'].setValue(response.data.description.toString());
      this.updateForm.controls['colorId'].setValue(parseInt(response.data.colorId.toString()));
      this.updateForm.controls['dailyPrice'].setValue(parseInt(response.data.dailyPrice.toString()));
      this.updateForm.controls['brandId'].setValue(parseInt(response.data.brandId.toString()));
      this.updateForm.controls['modelYear'].setValue(parseInt(response.data.modelYear.toString()));
      this.updateForm.controls['minFindexPoint'].setValue(parseInt(response.data.minFindexPoint.toString()));
    
this.selectedColor=parseInt(response.data.colorId.toString());
this.selectedBrand=parseInt(response.data.brandId.toString())

    })
  }
  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      carName: ["", Validators.required],
      modelYear:["", Validators.required],
      colorId:["",Validators.required],
      dailyPrice: ["", Validators.required],
      brandId:["", Validators.required],
      description: ["", Validators.required],
      carId:["",Validators.required],
      minFindexPoint:["",Validators.required]
    })
  }
  update() {
    if (this.updateForm.valid) {
      let updateModel = Object.assign({}, this.updateForm.value)
      console.log(updateModel)
      this.carService.updateCar(updateModel).subscribe(response => {

        if (response.success) {
          
          return this.router.navigate(["/cars"]).then(()=>{
            this.toastrService.success(response.message, "Güncelleme Başarılı")
          
          })
        }
        else {
          return this.toastrService.error(response.message, "Güncelleme Başarısız!")
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


