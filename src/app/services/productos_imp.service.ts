import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';


@Injectable({providedIn:'root'})
export class ProductosImpService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getProductos(){
    return this._http.get(this.url+'productos-imp')
  }

  getProducto(id:number){
    return this._http.get(this.url+'productos-imp/'+id)
  }

}
