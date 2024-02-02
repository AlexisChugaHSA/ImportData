import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';


@Injectable({providedIn:'root'})
export class PreciosImpService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getPrecios(){
    return this._http.get(this.url+'precios-imp')
  }

  getPrecio(id:number){
    return this._http.get(this.url+'precios-imp/'+id)
  }

}
