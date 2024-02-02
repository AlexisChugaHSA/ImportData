import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Empresa } from '../models/empresa';
import { GLOBAL } from './global.service';

@Injectable({providedIn:'root'})
export class EmpresaService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getEmpresas(){
    return this._http.get(this.url+'empresas')
  }

  addEmpresa(empresa:Empresa){
    
    let json=JSON.stringify(empresa);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'empresa',params,{headers})
  }

  getEmpresa(id:number){
    return this._http.get(this.url+'empresa/'+id)
  }

  editEmpresa(id:number, empresa:Empresa){
   let json=JSON.stringify(empresa);
   let params=json;
   let headers =new HttpHeaders({'Content-Type':'application/json'});
   return this._http.put(this.url+'empresa/'+id,params,{headers})
  }
  /*

  deletePersona(id:string){
  return this._http.delete(this.url+'persona/'+id);
  }*/
}