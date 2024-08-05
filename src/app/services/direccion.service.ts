import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Direccion } from '../models/direccion';
import { GLOBAL } from './global.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { throwError } from 'rxjs';


@Injectable({providedIn:'root'})
export class DireccionService {
  public url!:string;
  private access_token!:string;
  constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
    this.url=GLOBAL.url;
    this.access_token=this.localStorageService.get('token');
  }
  getDirecciones() {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.access_token });
      return this._http.get(this.url + 'direcciones', { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  addDireccion(direccion: Direccion) {
      let json = JSON.stringify(direccion);
      let params = json;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
      return this._http.post(this.url + 'direccion', params, { headers });

  }
  
  getDireccion(id: number) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.access_token });
      return this._http.get(this.url + 'direccion/' + id, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  

}