import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';


@Injectable({providedIn:'root'})
export class HomologacionImpService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getHomologaciones(){
    return this._http.get(this.url+'homologacion-imp')
  }

  getHomologacion(id:number){
    return this._http.get(this.url+'homologacion-imp/'+id)
  }

}
