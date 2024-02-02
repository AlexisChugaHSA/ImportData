import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';


@Injectable({providedIn:'root'})
export class EmpresasImpService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getEmpresasImp(){
    return this._http.get(this.url+'empresas-imp')
  }

  getEmpresaImp(id:number){
    return this._http.get(this.url+'empresas-imp/'+id)
  }

}
