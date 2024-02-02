import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LogProductoUsuario} from '../models/log_producto_usuario';
import { GLOBAL } from './global.service';

@Injectable({providedIn:'root'})
export class LogProductoUsuarioService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }


  addLogProdUser(log_pro_user:LogProductoUsuario){
    
    let json=JSON.stringify(log_pro_user);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'lpu',params,{headers})
  }

}