import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Direccion } from '../models/direccion';
import { GLOBAL } from './global.service';


@Injectable({providedIn:'root'})
export class DireccionService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getDirecciones(){
    return this._http.get(this.url+'direcciones')
  }

  addDireccion(direccion:Direccion){
    
    let json=JSON.stringify(direccion);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'direccion',params,{headers})
  }

  getDireccion(id:number){
    return this._http.get(this.url+'direccion/'+id)
  }
/*
  editPersona(id:string, persona:Persona){
   let json=JSON.stringify(persona);
   let params=json;
   let headers =new HttpHeaders({'Content-Type':'application/json'});
   return this._http.put(this.url+'persona/'+id,params,{headers})
  }

  deletePersona(id:string){
  return this._http.delete(this.url+'persona/'+id);
  }*/
}