import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { GLOBAL } from './global.service';
import { LocalStorageService } from 'angular-2-local-storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    public bandera=true;
    public url!:string;
    private access_token!:string;
    constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
      this.url=GLOBAL.url;
      this.access_token=this.localStorageService.get('token');
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
  getIsLoggedIn():any{
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    return this._http.get(this.url+'usuario-logueado',{headers});
  }
  isLogin(): boolean {
    this.getIsLoggedIn().subscribe(
      result => {
        let mensaje=result
        this.bandera=mensaje.login;
        return this.bandera;
      },
      error => {
        console.log(error)
      })
      return this.bandera;
      
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
