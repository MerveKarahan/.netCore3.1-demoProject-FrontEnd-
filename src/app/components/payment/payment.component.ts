import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CreditCardService } from 'src/app/services/credit-card.service';
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
  userCreditCards: Card[] = []
  constructor(private userService: UserService, private toastrService: ToastrService,
    private rentalService: RentalService, private formBuilder: FormBuilder, private router: Router,
    private creditCardService: CreditCardService) {
    if (localStorage.getItem("rental") != null) {
      this.rental = JSON.parse(localStorage.getItem("rental")?.toString() || '{}')
      //this.payment.rental=this.rental
    }
  }

  ngOnInit(): void {
    this.userId = this.getUserId()
    this.createCardForm()
    this.getUserCreditCards();
    console.log("Cards")
    console.log(this.userCreditCards)
   }


  createCardForm() {
    this.cardForm = this.formBuilder.group({
      cardHolderName: ["", Validators.required],
      userId: [parseInt(this.userId.toString())],
      cardNumber: ["", Validators.required],
      cardExprationDate: ["", Validators.required],
      cVV: ["", Validators.required]
    })
  }
  getUserId() {
    return this.userService.getUserId()
  }

  getUserCreditCards() {
    
    this.creditCardService.getCreditCardsByUserId(this.userId).subscribe(response=>{
       console.log("dsda")
      console.log(response.data)
      this.userCreditCards=response.data
    })
  }

  loadCard(card : Card){
    this.cardForm.controls['userId'].setValue(parseInt(card.userId.toString()));
    this.cardForm.controls['cardHolderName'].setValue(card.cardHolderName.toString());
    this.cardForm.controls['cardNumber'].setValue(card.cardNumber.toString());
    this.cardForm.controls['cardExprationDate'].setValue(card.cardExprationDate.toString());
    this.cardForm.controls['cVV'].setValue(card.cvv.toString());
  }

  paymentCar() {
    if (this.cardForm.valid) {
      let cardModel = Object.assign({}, this.cardForm.value)
      this.payment = { "creditCardModel": cardModel, "rental": this.rental }
      this.rentalService.addPayment(this.payment).subscribe(response => {
        if (response.success) {
          localStorage.removeItem("rental")
          localStorage.setItem("creditCard", JSON.stringify(this.payment.creditCardModel))
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
