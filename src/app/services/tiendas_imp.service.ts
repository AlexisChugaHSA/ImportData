import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';


@Injectable({providedIn:'root'})
export class TiendasImpService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getTiendas(){
    return this._http.get(this.url+'tiendas-imp')
  }

  getTienda(id:number){
    return this._http.get(this.url+'tiendas-imp/'+id)
  }

}
