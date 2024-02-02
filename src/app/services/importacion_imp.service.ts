import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';


@Injectable({providedIn:'root'})
export class ImportacionImpService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getImportaciones(){
    return this._http.get(this.url+'importacion-imp')
  }

  getImportacion(id:number){
    return this._http.get(this.url+'importacion-imp/'+id)
  }

}
