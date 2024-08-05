import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Pago } from '../models/pago';
import { GLOBAL } from './global.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { throwError } from 'rxjs';

@Injectable({providedIn:'root'})
export class PagoService {
  public url!:string;
  private access_token!:string;
  constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
    this.url=GLOBAL.url;
    this.access_token=this.localStorageService.get('token');
  }
  getPagos() {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.access_token });
      return this._http.get(this.url + 'pagos', { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  addPago(pago: Pago) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let json = JSON.stringify(pago);
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.access_token
      });
      return this._http.post(this.url + 'pago', json, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  getPago(id: number) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.access_token });
      return this._http.get(this.url + 'pago/' + id, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  getPagobyEmp(id: number) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.access_token });
      return this._http.get(this.url + 'pagos-empresa/' + id, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  putCancelPago(id: number) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.access_token });
      let opciones = { headers: headers };
      return this._http.put(this.url + 'cancelar-pago/' + id, {}, opciones);
    } else {
      return throwError('Token no disponible');
    }
  }
  

}