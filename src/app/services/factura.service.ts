import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Factura } from '../models/factura';
import { GLOBAL } from './global.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable({providedIn:'root'})
export class FacturaService {
  public url!:string;
  private access_token!:string;
  constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
    this.url=GLOBAL.url;
    this.access_token=this.localStorageService.get('token');
  }

  addFactura(factura:Factura){
    this.access_token=this.localStorageService.get('token');
    let json=JSON.stringify(factura);
    let params=json;
    //console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    return this._http.post(this.url+'facturacion',params,{headers})
  }
  getFacturas(){
    this.access_token=this.localStorageService.get('token');
    let headers =new HttpHeaders({'Authorization': 'Bearer '+this.access_token});
    return this._http.get(this.url+'facturacion',{headers})
  }
  getFactura(id:number){
    this.access_token=this.localStorageService.get('token');
    let headers =new HttpHeaders({'Authorization': 'Bearer '+this.access_token});
    return this._http.get(this.url+'facturacion/'+id,{headers})
  }

  getFacturasByIdEmp(id:number){
    this.access_token=this.localStorageService.get('token');
    let headers =new HttpHeaders({'Authorization': 'Bearer '+this.access_token});
    return this._http.get(this.url+'facturacionbyemp/'+id,{headers})
  }


}