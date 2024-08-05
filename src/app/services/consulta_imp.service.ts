import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { ConsultaImp } from '../models/consulta_imp';
import { LocalStorageService } from 'angular-2-local-storage';
import { throwError } from 'rxjs';


@Injectable({providedIn:'root'})
export class ConsultaImpService {
  public url!:string;
  private access_token!:string;

  constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
    this.url=GLOBAL.url;
    this.access_token=this.localStorageService.get('token');
  }
  getDatosMarcaXUnidades(consulta: ConsultaImp) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let json = JSON.stringify(consulta);
      let params = json;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.access_token });
      return this._http.post(this.url + 'consulta-top-marcas-unidades', params, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  getDatosMarcaXFob(consulta: ConsultaImp) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let json = JSON.stringify(consulta);
      let params = json;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.access_token });
      return this._http.post(this.url + 'consulta-top-marcas-fob', params, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  getDatosImportacionesXFob(consulta: ConsultaImp) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let json = JSON.stringify(consulta);
      let params = json;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.access_token });
      return this._http.post(this.url + 'consulta-importaciones-fob-unidades', params, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  getDatosShareXMarca(consulta: ConsultaImp) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let json = JSON.stringify(consulta);
      let params = json;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.access_token });
      return this._http.post(this.url + 'consulta-share-por-marcas', params, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  getDatosShareXSegmento(consulta: ConsultaImp) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let json = JSON.stringify(consulta);
      let params = json;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.access_token });
      return this._http.post(this.url + 'consulta-share-por-segmento', params, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  getDatosPrecioXMarca(consulta: ConsultaImp) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let json = JSON.stringify(consulta);
      let params = json;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.access_token });
      return this._http.post(this.url + 'precio-promedio-por-marcas', params, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  getDatosFobXImportador(consulta: ConsultaImp) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let json = JSON.stringify(consulta);
      let params = json;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.access_token });
      return this._http.post(this.url + 'consulta-fob-por-importador', params, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  getCaracterísticasXMarca(consulta: ConsultaImp) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let json = JSON.stringify(consulta);
      let params = json;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.access_token });
      return this._http.post(this.url + 'consulta-caracteristicas-por-marca', params, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  getVentasXImportador(consulta: ConsultaImp) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let json = JSON.stringify(consulta);
      let params = json;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.access_token });
      return this._http.post(this.url + 'consulta-ventas-por-importador', params, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  getAnios(id: number) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.access_token });
      return this._http.get(this.url + 'consulta-anios-fecha-despacho/' + id, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  getCaracteristicas(id: number) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.access_token });
      return this._http.get(this.url + 'consulta-filtro-caracteristicas/' + id, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
}
