import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Membresia } from '../models/membresia';
import { GLOBAL } from './global.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { throwError } from 'rxjs';

@Injectable({providedIn:'root'})
export class MembresiaService {
  public url!:string;
  private access_token!:string;
  constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
    this.url=GLOBAL.url;
    this.access_token=this.localStorageService.get('token');
  }
  getMembresias() {
      return this._http.get(this.url + 'membresias');
  }
  
  addMembresia(membresia: Membresia) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let json = JSON.stringify(membresia);
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.access_token
      });
      return this._http.post(this.url + 'membresias', json, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  
  getMembresia(id: number) {
    this.access_token = this.localStorageService.get('token');
    if (this.access_token) {
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.access_token
      });
      return this._http.get(this.url + 'membresia/' + id, { headers });
    } else {
      return throwError('Token no disponible');
    }
  }
  

}