import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Membresia } from '../models/membresia';
import { GLOBAL } from './global.service';


@Injectable({providedIn:'root'})
export class MembresiaService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getMembresias(){
    return this._http.get(this.url+'membresias')
  }

  addMembresia(membresia:Membresia){
    
    let json=JSON.stringify(membresia);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'membresias',params,{headers})
  }

  getMembresia(id:number){
    return this._http.get(this.url+'membresia/'+id)
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