import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/list-response-model';
import { RentalDTO } from '../models/rentalDTO';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  baseUrl="https://localhost:44348/api/"
  constructor(private httpClient:HttpClient) { }


  getRentalList():Observable<ListResponseModel<RentalDTO>>{
    return this.httpClient.get<ListResponseModel<RentalDTO>>(this.baseUrl+"Rentals/getrentallist")
  }
}
