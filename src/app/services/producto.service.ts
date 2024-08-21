import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Producto } from '../models/producto';
import { GLOBAL } from './global.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { throwError } from 'rxjs';


@Injectable({providedIn:'root'})
export class ProductoService {
  public url!:string;
  private access_token!:string;
  constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
    this.url=GLOBAL.url;
  }
  getProductos() {
      return this._http.get(this.url + 'productos');
  }
  
  getProducto(id: number) {
      return this._http.get(this.url + 'producto/' + id);
  }
  
  getCatProd(id: number) {
      return this._http.get(this.url + 'categoria/' + id);
  }
  

}