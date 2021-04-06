import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/list-response-model';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  
  baseUrl="https://localhost:44348/api/"
  constructor(private httpClient:HttpClient) { }


  getColors():Observable<ListResponseModel<Color>>{
    return this.httpClient.get<ListResponseModel<Color>>(this.baseUrl+"Colors")
  }
}
