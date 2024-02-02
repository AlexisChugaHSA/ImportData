import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';


@Injectable({providedIn:'root'})
export class ImportadorImpService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getImportadores(){
    return this._http.get(this.url+'importador-imp')
  }

  getImportador(id:number){
    return this._http.get(this.url+'importador-imp/'+id)
  }

}
