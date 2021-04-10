import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  updateForm!: FormGroup
  constructor(private toastrService: ToastrService, private formBuilder: FormBuilder,
     private router: Router, private colorService:ColorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.createUpdateForm()
    this.activatedRoute.params.subscribe(params => {
      this.loadColor(params["colorId"]);
    });
  }
  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      colorName: ["", Validators.required],
      colorId:["",Validators.required]
    })
  }
  loadColor(colorId: number) {
    this.colorService.getColorById(colorId).subscribe(response => {
      this.updateForm.controls['colorId'].setValue(parseInt(response.data.colorId.toString()));
      this.updateForm.controls['colorName'].setValue(response.data.colorName.toString());
     

    })
  }
  update() {
    if (this.updateForm.valid) {
      let updateModel = Object.assign({}, this.updateForm.value)
      this.colorService.updateColor(updateModel).subscribe(response => {

        if (response.success) {
          
          return this.router.navigate(["/colors"]).then(()=>{
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

