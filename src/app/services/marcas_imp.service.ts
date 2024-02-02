import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';


@Injectable({providedIn:'root'})
export class MarcasImpService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getMarcas(){
    return this._http.get(this.url+'marcas-imp')
  }

  getTienda(id:number){
    return this._http.get(this.url+'marcas-imp/'+id)
  }

}
