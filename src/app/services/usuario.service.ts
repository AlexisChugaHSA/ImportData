import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { GLOBAL } from './global.service';


@Injectable({providedIn:'root'})
export class UsuarioService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getUsuarios(){
    return this._http.get(this.url+'usuarios')
  }

  addUsuario(usuario:Usuario){
    
    let json=JSON.stringify(usuario);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'usuario',params,{headers})
  }

  getUsuario(id:string){
    return this._http.get(this.url+'usuario/'+id)
  }
  
  comprobarPassword(usuario:Usuario){
    let json=JSON.stringify(usuario);
    let params=json;
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'comprobar_password',params,{headers})
  }

  editUsuario(id:number, usuario:Usuario){
   let json=JSON.stringify(usuario);
   let params=json;
   let headers =new HttpHeaders({'Content-Type':'application/json'});
   return this._http.put(this.url+'usuario/'+id,params,{headers})
  }

  deleteUsuario(id:string){
  return this._http.delete(this.url+'usuario/'+id);
  }


}