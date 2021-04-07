import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDTO } from '../models/carDTO';
import { ListResponseModel } from '../models/list-response-model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  baseUrl="https://localhost:44348/api/"
  
  constructor(private httpClient:HttpClient) { }

  getCarDTO():Observable<ListResponseModel<CarDTO>>{
    return this.httpClient.get<ListResponseModel<CarDTO>>(this.baseUrl+"Cars/getallcars")
  }

}