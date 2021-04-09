import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  constructor(private authService: AuthService, private localStorageService: LocalStorageService,
    private toastrService: ToastrService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }
  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response => {

        if (response.success) {
          this.toastrService.success(response.message, "Giriş Başarılı")
          this.localStorageService.setToken(response.data.token)
          return this.router.navigate(["/cars"])
        }
        else {
          return this.toastrService.error(response.message, "Giriş Başarısız!")
        }

      })
    }
    else {
      return this.toastrService.error("Model valid değil", "HATA!!")
    }
    return
  }


}
