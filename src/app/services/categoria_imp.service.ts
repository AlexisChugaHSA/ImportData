import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';


@Injectable({providedIn:'root'})
export class CategoriaImpService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getCategoriasImp(){
    return this._http.get(this.url+'categorias-imp')
  }

  getCategoriaImp(id:number){
    return this._http.get(this.url+'categorias-imp/'+id)
  }

}
