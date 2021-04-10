import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/list-response-model';
import { Rental } from '../models/rental';
import { RentalDTO } from '../models/rentalDTO';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  baseUrl="https://localhost:44348/api/"
  constructor(private httpClient:HttpClient) { }


  getRentalList():Observable<ListResponseModel<RentalDTO>>{
    return this.httpClient.get<ListResponseModel<RentalDTO>>(this.baseUrl+"Rentals/getrentallist")
  }

  checkCarAvailable(rentalModel:Rental){
    return this.httpClient.post<ResponseModel>(this.baseUrl+"Rentals/carCheck",rentalModel)
  }
}
