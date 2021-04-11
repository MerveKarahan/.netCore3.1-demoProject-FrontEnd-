import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  rental!: Rental
  payment!: Payment
  cardForm!: FormGroup
  userId!: number

  constructor(private userService: UserService, private toastrService: ToastrService,
    private rentalService: RentalService, private formBuilder: FormBuilder,private router: Router) {
    if (localStorage.getItem("rental") != null) {
      this.rental = JSON.parse(localStorage.getItem("rental")?.toString() || '{}')
      //this.payment.rental=this.rental
    }
  }

  ngOnInit(): void {
    this.userId = this.getUserId()
    this.createCardForm()
  }
  createCardForm() {
    this.cardForm = this.formBuilder.group({
      cardHolderName: ["", Validators.required],
      userId: [this.userId],
      cardNumber: ["", Validators.required],
      cardExprationDate: ["", Validators.required],
      cVV: ["", Validators.required]
    })
  }
  getUserId() {
    return this.userService.getUserId()
  }

  paymentCar() {
    if (this.cardForm.valid) {
      let cardModel = Object.assign({}, this.cardForm.value)
      this.payment = { "creditCardModel": cardModel, "rental": this.rental }
      this.rentalService.addPayment(this.payment).subscribe(response => {
        if (response.success) {
          localStorage.removeItem("rental")
          localStorage.setItem("creditCard",JSON.stringify(this.payment.creditCardModel))
         return this.router.navigate(["/rentSuccess"])

        }
        else {
          return this.toastrService.error(response.message, "Kiralama Başarısız!")
        }

      }, error => {
        console.log(error)
        return this.toastrService.error(error.error.Message)
      })
    }
  }
}
