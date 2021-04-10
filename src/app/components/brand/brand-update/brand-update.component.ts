import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  updateForm!: FormGroup
  constructor(private toastrService: ToastrService, private formBuilder: FormBuilder,
     private router: Router, private brandService:BrandService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.createUpdateForm()
    this.activatedRoute.params.subscribe(params => {
      this.loadBrand(params["brandId"]);
    });
  }
  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      brandName: ["", Validators.required],
      brandId:["",Validators.required]
    })
  }
  loadBrand(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe(response => {
      this.updateForm.controls['brandId'].setValue(parseInt(response.data.brandId.toString()));
      this.updateForm.controls['brandName'].setValue(response.data.brandName.toString());
     

    })
  }
  update() {
    if (this.updateForm.valid) {
      let updateModel = Object.assign({}, this.updateForm.value)
      this.brandService.updateBrand(updateModel).subscribe(response => {

        if (response.success) {
          
          return this.router.navigate(["/brands"]).then(()=>{
            this.toastrService.success(response.message, "Güncelleme Başarılı")
          
          })
        }
        else {
          return this.toastrService.error(response.message, "Güncelleme Başarısız!")
        }

      },error=>{
        return this.toastrService.error(error.error)
      })
      

    }
    else {
      return this.toastrService.error("Model valid değil", "HATA!!")
    }
    return
  }


}
