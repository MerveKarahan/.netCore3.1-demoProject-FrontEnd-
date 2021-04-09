import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  UserForm!: FormGroup
  userId!: number
  constructor(private authService: AuthService, private toastrService: ToastrService, private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.createUserForm();
    this.userId=this.getUserId()
    this.loadUser(this.userId);
  }


  createUserForm() {
    this.UserForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      userId: [this.getUserId],
      lastName: ["", Validators.required],
      email: ["", Validators.required]
    })
  }

  getUserId() {
    return this.userService.getUserId()
  }

  loadUser(userId: number) {
    this.userService.getUserById(userId).subscribe(response => {
      this.UserForm.controls['userId'].setValue(parseInt(response.data.userId.toString()));
      this.UserForm.controls['firstName'].setValue(response.data.firstName.toString());
      this.UserForm.controls['lastName'].setValue(response.data.lastName.toString());
      this.UserForm.controls['email'].setValue(response.data.email.toString());

    })
  }
  updateUser() {
   
    if (this.UserForm.valid) {
      let UserModel = Object.assign({}, this.UserForm.value)
      console.log(UserModel)
      this.userService.changeUserInformation(UserModel).subscribe(response => {

        if (response.success) {
          return this.toastrService.success(response.message, "Güncelleme Başarılı")

        }
        else {
          return this.toastrService.error(response.message, "Güncelleme Başarısız!")
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
