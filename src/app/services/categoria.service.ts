import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Categoria } from '../models/categoria';
import { GLOBAL } from './global.service';


@Injectable({providedIn:'root'})
export class CategoriaService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getCategorias(){
    return this._http.get(this.url+'categorias')
  }

  getCat(id:number){
    return this._http.get(this.url+'categoria/'+id)
  }

}
