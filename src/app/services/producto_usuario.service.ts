import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { ProductoUsuario } from '../models/producto_usuario';
import { GLOBAL } from './global.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { throwError } from 'rxjs';

@Injectable({providedIn:'root'})
export class ProductoUsuarioService {
  public url!:string;
  private access_token!:string;
  constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
    this.url=GLOBAL.url;
    this.access_token=this.localStorageService.get('token');
  }


  addProdUser(pro_user: ProductoUsuario) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let json = JSON.stringify(pro_user);
      let params = json;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.access_token });
      return this._http.post(this.url + 'producto-usuario', params, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  /*
  getP_U(id: number) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let headers = new HttpHeaders({ "Authorization": "Bearer " + this.access_token +""});
      return this._http.get(this.url + 'producto-usuario/' + id, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }*/
    getP_U(id: number) {
      this.access_token = this.localStorageService.get('token');
      if (this.access_token) {
        // Eliminar la cadena vacía al final de la concatenación del token
        let headers = new HttpHeaders({ 'Authorization': `Bearer ${this.access_token}` });
        
        return this._http.get(`${this.url}producto-usuario/${id}`, { headers });
      } else {
        return throwError('Token no disponible');
      }
    }
  

}