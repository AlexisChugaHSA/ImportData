import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { GLOBAL } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    public url!:string;
    constructor( private _http:HttpClient) { 
      this.url=GLOBAL.url
    }
  private isLoggedIn = false;


  loginUsuario(usuario:Usuario){
    let json=JSON.stringify(usuario);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    this.isLoggedIn=true;
    return this._http.post(this.url+'login',params,{headers})
  }
  loginUsuarioSi(usuario:Usuario){
    let json=JSON.stringify(usuario);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    this.isLoggedIn=true;
    return this._http.post(this.url+'login/si',params,{headers})
  }
  getIsLoggedIn(){
    return this.isLoggedIn;
  }

  logout() {
    // Aquí se realizaría el proceso de cierre de sesión
    // Una vez cerrada la sesión, se llama a la función setLoggedIn
    this.setLoggedIn(false);
  }


  setLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }
}
