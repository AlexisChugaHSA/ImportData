import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { DetalleFactura} from '../models/detalle_factura';
import { GLOBAL } from './global.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { throwError } from 'rxjs';

@Injectable({providedIn:'root'})
export class DetalleFacturaService {
  public url!:string;
  private access_token!:string;
  constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
    this.url=GLOBAL.url;
    this.access_token=this.localStorageService.get('token');
  }

  addDetFactura(detFactura: DetalleFactura) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let json = JSON.stringify(detFactura);
      let params = json;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.access_token });
      return this._http.post(this.url + 'detalle-factura', params, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  getDetFactByIdFact(id: number) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.access_token });
      return this._http.get(this.url + 'detalle-facturas-fact/' + id, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  getFactbyPago(id: number) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.access_token });
      return this._http.get(this.url + 'detalle-facturas-pago/' + id, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  

}