import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { LogProductoUsuario} from '../models/log_producto_usuario';
import { GLOBAL } from './global.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable({providedIn:'root'})
export class LogProductoUsuarioService {
  public url!:string;
  private access_token!:string;
  constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
    this.url=GLOBAL.url;
    this.access_token=this.localStorageService.get('token');
  }


  addLogProdUser(log_pro_user:LogProductoUsuario){
    this.access_token=this.localStorageService.get('token');
    let json=JSON.stringify(log_pro_user);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    return this._http.post(this.url+'lpu',params,{headers})
  }

}