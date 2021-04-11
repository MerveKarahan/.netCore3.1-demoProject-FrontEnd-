import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { ListResponseModel } from '../models/list-response-model';
import { ResponseModel } from '../models/response-model';


@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  baseUrl = "http://localhost:58739/api/"

  constructor(private httpClient: HttpClient) { }


  getCreditCardsByUserId(userId: number) {
    return this.httpClient.get<ListResponseModel<Card>>(this.baseUrl + "CreditCards/userid?id=" + userId)
  }
  addCreditCard(creditCardModel: Card) {
    return this.httpClient.post<ResponseModel>(this.baseUrl + "CreditCards/add", creditCardModel)
  }
}
