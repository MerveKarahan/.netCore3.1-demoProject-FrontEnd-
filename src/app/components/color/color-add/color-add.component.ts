import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  addForm!: FormGroup
  constructor(private toastrService: ToastrService, private formBuilder: FormBuilder,
     private router: Router, private colorService:ColorService) { }

  ngOnInit(): void {
    this.createAddForm()
  }
  createAddForm() {
    this.addForm = this.formBuilder.group({
      colorName: ["", Validators.required]
    })
  }
  add() {
    if (this.addForm.valid) {
      let addModel = Object.assign({}, this.addForm.value)
      this.colorService.addColor(addModel).subscribe(response => {

        if (response.success) {
          
          return this.router.navigate(["/colors"]).then(()=>{
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

