import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-rent-success',
  templateUrl: './rent-success.component.html',
  styleUrls: ['./rent-success.component.css']
})
export class RentSuccessComponent implements OnInit {
  cardModel!: Card
  constructor(private router: Router,
    private toastrService: ToastrService, private creditCardService: CreditCardService) { }

  ngOnInit(): void {
    this.getCard()
    console.log(this.cardModel)
  }

  saveCreditCard() {
    this.creditCardService.addCreditCard(this.cardModel).subscribe(response => {
      localStorage.removeItem("creditCard")
      if (response.success) {
        localStorage.removeItem("creditCard")
        return this.router.navigate(["/"]).then(() => {
          this.toastrService.success("Kredi Kart Bilgileriniz Kaydedilmiştir.","Kayıt Başarılı")

        })
      }
      else {
        return this.router.navigate(["/"]).then(() => {
          this.toastrService.error("Kredi Kart Bilgileriniz Kaydedilemedi.", "Kayıt Başarısız!")

        })
      }

    }, error => {
      console.log(error)
      return this.router.navigate(["/"]).then(() => {
        
        this.toastrService.error(error.error.message,"Hata!")

      })
    })
}

notSave() {
  localStorage.removeItem("creditCard")
  return this.router.navigate(["/"]).then(() => {
    this.toastrService.warning("Kredi Kart Bilgileriniz Kaydedilmemiştir.")

  })
}

getCard() {
  if (localStorage.getItem("creditCard") != null) {
    this.cardModel = JSON.parse(localStorage.getItem("creditCard")?.toString() || '{}')

  }
}
}
