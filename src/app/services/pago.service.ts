import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Pago } from '../models/pago';
import { GLOBAL } from './global.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable({providedIn:'root'})
export class PagoService {
  public url!:string;
  private access_token!:string;
  constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
    this.url=GLOBAL.url;
    this.access_token=this.localStorageService.get('token');
  }
  getPagos(){
    this.access_token=this.localStorageService.get('token');
    let headers =new HttpHeaders({'Authorization': 'Bearer '+this.access_token});
    return this._http.get(this.url+'pagos',{headers});
  }

  addPago(pago:Pago){
    this.access_token=this.localStorageService.get('token');
    let json=JSON.stringify(pago);
    let params=json;
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    return this._http.post(this.url+'pago',params,{headers})
  }

  getPago(id:number){
    this.access_token=this.localStorageService.get('token');
    let headers =new HttpHeaders({'Authorization': 'Bearer '+this.access_token});
    return this._http.get(this.url+'pago/'+id,{headers})
  }

  getPagobyEmp(id:number){
    let headers =new HttpHeaders({'Authorization': 'Bearer '+this.access_token});
    return this._http.get(this.url+'pagos-empresa/'+id,{headers})
  }
  putCancelPago(id:number){
    this.access_token=this.localStorageService.get('token');
    console.log(this.access_token)
    let headers =new HttpHeaders({'Authorization': 'Bearer '+this.access_token});
    let opciones = { headers: headers };
    return this._http.put(this.url+'cancelar-pago/'+id,{},opciones);
  }
/*
  editPago(id:number, pago:Pago){
   let json=JSON.stringify(pago);
   let params=json;
   let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
   return this._http.put(this.url+'pago/'+id,params,{headers})
  }
  /*

  deletePersona(id:string){
  return this._http.delete(this.url+'persona/'+id);
  }*/
}