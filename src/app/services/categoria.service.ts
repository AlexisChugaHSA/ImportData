import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Categoria } from '../models/categoria';
import { GLOBAL } from './global.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { throwError } from 'rxjs';

@Injectable({providedIn:'root'})
export class CategoriaService {
  public url!:string;
  private access_token!:string;
  constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
    this.url=GLOBAL.url;
    this.access_token=this.localStorageService.get('token');
  }
  getCategorias() {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.access_token });
      return this._http.get(this.url + 'categorias', { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  getCat(id: number) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.access_token });
      return this._http.get(this.url + 'categoria/' + id, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  

}
