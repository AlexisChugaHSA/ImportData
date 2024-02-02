import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Factura } from '../models/factura';
import { GLOBAL } from './global.service';

@Injectable({providedIn:'root'})
export class FacturaService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }

  addFactura(factura:Factura){
    
    let json=JSON.stringify(factura);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'facturacion',params,{headers})
  }
  getFacturas(){
    return this._http.get(this.url+'facturacion')
  }
  getFactura(id:number){
    return this._http.get(this.url+'facturacion/'+id)
  }

  getFacturasByIdEmp(id:number){
    return this._http.get(this.url+'facturacionbyemp/'+id)
  }


}