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
    private id_usuario!:any;
    constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
      this.url=GLOBAL.url;
      this.access_token=this.localStorageService.get('token');
      this.id_usuario=this.localStorageService.get('id_usuario');
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
    this.access_token=this.localStorageService.get('token');
    this.id_usuario=this.localStorageService.get('id_usuario');
    let headers =new HttpHeaders({'Authorization': 'Bearer '+this.access_token});
    console.log(headers)
    return this._http.get(this.url+'usuario-logueado/'+this.id_usuario,{headers});
    
  }
  /*
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
      
  }*/

  logout(id: number) {
    this.access_token=this.localStorageService.get('token');
    let cabecera = new HttpHeaders({'Authorization': 'Bearer ' + this.access_token});
    console.log('Bearer ' + this.access_token);
    let opciones = { headers: cabecera }; // Opciones con el objeto de cabecera
    return this._http.post(this.url + 'logout/' + id, {}, opciones); // Pasar las opciones en el tercer parámetro
  }

  


  setLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }
}
