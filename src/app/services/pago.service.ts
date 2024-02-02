import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Pago } from '../models/pago';
import { GLOBAL } from './global.service';

@Injectable({providedIn:'root'})
export class PagoService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getPagos(){
    return this._http.get(this.url+'pagos')
  }

  addPago(pago:Pago){
    
    let json=JSON.stringify(pago);
    let params=json;
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'pago',params,{headers})
  }

  getPago(id:number){
    return this._http.get(this.url+'pago/'+id)
  }

  getPagobyEmp(id:number){
    return this._http.get(this.url+'pagos-empresa/'+id)
  }
  putCancelPago(id:number){
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.put(this.url+'cancelar-pago/'+id,{headers});
  }
/*
  editPago(id:number, pago:Pago){
   let json=JSON.stringify(pago);
   let params=json;
   let headers =new HttpHeaders({'Content-Type':'application/json'});
   return this._http.put(this.url+'pago/'+id,params,{headers})
  }
  /*

  deletePersona(id:string){
  return this._http.delete(this.url+'persona/'+id);
  }*/
}