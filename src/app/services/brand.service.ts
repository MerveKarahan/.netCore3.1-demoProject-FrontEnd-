import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/list-response-model';
import { Brand } from '../models/brand';
import { SingleResponseModel } from '../models/single-response-model';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  baseUrl="http://localhost:58739/api/"
  constructor(private httpClient:HttpClient) { }


  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.baseUrl+"Brands")
  }
  getBrandById(Id:number){
return this.httpClient.get<SingleResponseModel<Brand>>(this.baseUrl+"Brands/id?id="+Id)
  }
  addBrand(brandModel:Brand){
    return this.httpClient.post<ResponseModel>(this.baseUrl+"Brands/add",brandModel)
  }
  updateBrand(brandModel:Brand){
    return this.httpClient.post<ResponseModel>(this.baseUrl+"Brands/update",brandModel)
  }
}
