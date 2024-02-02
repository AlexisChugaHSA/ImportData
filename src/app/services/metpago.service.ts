import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { MetodoPago } from '../models/metodo_pago';
import { GLOBAL } from './global.service';

@Injectable({providedIn:'root'})
export class EMetPagoService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }


  addMetPago(metPago:MetodoPago){
    let json=JSON.stringify(metPago);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'metodo-pago',params,{headers})
  }

}