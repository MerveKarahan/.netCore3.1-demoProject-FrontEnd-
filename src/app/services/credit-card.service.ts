import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { ResponseModel } from '../models/response-model';
import { SingleResponseModel } from '../models/single-response-model';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  baseUrl = "http://localhost:58739/api/"

  constructor(private httpClient: HttpClient) { }


  getCreditCardByUserId(userId: number) {
    return this.httpClient.get<SingleResponseModel<Card>>(this.baseUrl + "CreditCards/userid?id=" + userId)
  }
  addCreditCard(creditCardModel: Card) {
    return this.httpClient.post<ResponseModel>(this.baseUrl + "CreditCards/add", creditCardModel)
  }
}
