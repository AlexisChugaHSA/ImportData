import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { ProductoUsuario } from '../models/producto_usuario';
import { GLOBAL } from './global.service';

@Injectable({providedIn:'root'})
export class ProductoUsuarioService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }


  addProdUser(pro_user:ProductoUsuario){
    
    let json=JSON.stringify(pro_user);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'producto-usuario',params,{headers})
  }
  getP_U(id:number){
    return this._http.get(this.url+'producto-usuario/'+id)
  }

}