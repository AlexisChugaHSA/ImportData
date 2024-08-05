import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { GLOBAL } from './global.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { throwError } from 'rxjs';


@Injectable({providedIn:'root'})
export class UsuarioService {
  public url!:string;
  private access_token!:string;
  constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
    this.url=GLOBAL.url;
    this.access_token=this.localStorageService.get('token');
  }
  getUsuarios(){
    this.access_token=this.localStorageService.get('token');
    let headers =new HttpHeaders({'Authorization': 'Bearer '+this.access_token});
    return this._http.get(this.url+'usuarios',{headers})
  }

  addUsuario(usuario:Usuario){
    let json=JSON.stringify(usuario);
    let params=json;
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'usuario',params,{headers})
  }

  getUsuario(id: string) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.access_token });
      return this._http.get(this.url + 'usuario/' + id, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  comprobarPassword(usuario: Usuario) {

      let json = JSON.stringify(usuario);
      let params = json;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this._http.post(this.url + 'comprobar_password', params, { headers });

    
  }
  
  editUsuario(id: number, usuario: Usuario) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let json = JSON.stringify(usuario);
      let params = json;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.access_token });
      return this._http.put(this.url + 'usuario/' + id, params, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  deleteUsuario(id: string) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.access_token });
      return this._http.delete(this.url + 'usuario/' + id, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  comprobarUsuario(usuario:string){
    return this._http.get(this.url+'comprobar-usuario/'+usuario)
  }


}