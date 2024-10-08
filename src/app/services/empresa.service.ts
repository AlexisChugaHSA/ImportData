import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Empresa } from '../models/empresa';
import { GLOBAL } from './global.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { throwError } from 'rxjs';

@Injectable({providedIn:'root'})
export class EmpresaService {
  public url!:string;
  private access_token!:string;
  constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
    this.url=GLOBAL.url;
    this.access_token=this.localStorageService.get('token');
  }
  getEmpresas(id: number) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.access_token });
      return this._http.get(this.url + 'empresas-fact/' + id, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  addEmpresa(empresa: Empresa) {
      let json = JSON.stringify(empresa);
      let params = json;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
      return this._http.post(this.url + 'empresa', params, { headers });
  }
  
  getEmpresa(id: number) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.access_token });
      return this._http.get(this.url + 'empresa/' + id, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  editEmpresa(id: number, empresa: Empresa) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let json = JSON.stringify(empresa);
      let params = json;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.access_token });
      return this._http.put(this.url + 'empresa/' + id, params, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  comprobarEmpresa(ruc:string){
    return this._http.get(this.url+'comprobar-empresa/'+ruc)
  }
  
}