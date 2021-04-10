import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/list-response-model';
import { SingleResponseModel } from '../models/single-response-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  
  baseUrl="http://localhost:58739/api/"
  constructor(private httpClient:HttpClient) { }


  getCustomers():Observable<ListResponseModel<Customer>>{
    return this.httpClient.get<ListResponseModel<Customer>>(this.baseUrl+"Customers")
  }

  getCustomerByUserId(userId:number){
    return this.httpClient.get<SingleResponseModel<Customer>>(this.baseUrl+"Customers/userId?userId="+userId)
  }
}
