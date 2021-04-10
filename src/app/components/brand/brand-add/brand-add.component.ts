import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  addForm!: FormGroup
  constructor(private toastrService: ToastrService, private formBuilder: FormBuilder,
     private router: Router, private brandService:BrandService) { }

  ngOnInit(): void {
    this.createAddForm()
  }
  createAddForm() {
    this.addForm = this.formBuilder.group({
      brandName: ["", Validators.required]
    })
  }
  add() {
    if (this.addForm.valid) {
      let addModel = Object.assign({}, this.addForm.value)
      this.brandService.addBrand(addModel).subscribe(response => {

        if (response.success) {
          
          return this.router.navigate(["/brands"]).then(()=>{
            this.toastrService.success(response.message, "Kayıt Başarılı")
          
          })
        }
        else {
          return this.toastrService.error(response.message, "Kayıt Başarısız!")
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
