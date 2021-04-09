import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm!:FormGroup
  constructor(private authService: AuthService, private localStorageService: LocalStorageService,
    private toastrService: ToastrService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
    })
  }
  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value)
      this.authService.register(registerModel).subscribe(response => {

        if (response.success) {
          this.toastrService.success(response.message, "Kayıt Başarılı")
          this.localStorageService.setToken(response.data.token)
          return this.router.navigate(["/cars"])
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
