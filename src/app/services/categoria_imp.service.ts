import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';


@Injectable({providedIn:'root'})
export class SubCategoriaImpService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getSubCategoriasImp(){
    return this._http.get(this.url+'subcategorias-imp')
  }

  getSubCategoriaImp(id:number){
    return this._http.get(this.url+'subcategorias-imp/'+id)
  }

}
