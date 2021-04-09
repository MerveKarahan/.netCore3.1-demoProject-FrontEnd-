import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/list-response-model';
import { ResponseModel } from '../models/response-model';
import { SingleResponseModel } from '../models/single-response-model';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  
  baseUrl="https://localhost:44348/api/"
  constructor(private httpClient:HttpClient) { }


  getColors():Observable<ListResponseModel<Color>>{
    return this.httpClient.get<ListResponseModel<Color>>(this.baseUrl+"Colors")
  }
  getColorById(Id:number){
    return this.httpClient.get<SingleResponseModel<Color>>(this.baseUrl+"Colors/id?id="+Id)
      }
      addColor(colorModel:Color){
        return this.httpClient.post<ResponseModel>(this.baseUrl+"Colors/add",colorModel)
      }
      updateColor(colorModel:Color){
        return this.httpClient.post<ResponseModel>(this.baseUrl+"Colors/update",colorModel)
      }
}
