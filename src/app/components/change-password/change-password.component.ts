import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup
  userId!:number
  constructor(private authService: AuthService, private toastrService: ToastrService, private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.createChangePasswordForm();
    this.userId=this.getUserId()
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      passwordConfirm: ["", Validators.required],
     userId:[this.getUserId],
      password: ["", Validators.required]
    })
  }

  getUserId() {
    return this.userService.getUserId()
  }

  changePassword() {
    this.changePasswordForm.controls['userId'].setValue(parseInt(this.userId.toString()));
    if (this.changePasswordForm.valid) {
      let changePasswordModel = Object.assign({}, this.changePasswordForm.value)
      console.log(changePasswordModel)
      this.authService.changePassword(changePasswordModel).subscribe(response => {

        if (response.success) {
          return this.toastrService.success(response.message, "Şifre Başarılı")

        }
        else {
          return this.toastrService.error(response.message, "Giriş Başarısız!")
        }

      }, error => {
        console.log(error)
        return this.toastrService.error(error.error.message)
      })


    }
    else {
      return this.toastrService.error("Model valid değil", "HATA!!")
    }
    return
  }


}
