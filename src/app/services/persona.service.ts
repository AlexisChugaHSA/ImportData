import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Persona } from '../models/persona';
import { GLOBAL } from './global.service';


@Injectable({providedIn:'root'})
export class PersonaService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getPersonas(){
    return this._http.get(this.url+'personas')
  }

  addPersona(persona:Persona){
    
    let json=JSON.stringify(persona);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'persona',params,{headers})
  }

  getPersona(id:number){
    return this._http.get(this.url+'persona/'+id)
  }
  getPersonaByUser(id:number){
    return this._http.get(this.url+'persona-by-user/'+id)
  }

  editPersona(id:number, persona:Persona){
   let json=JSON.stringify(persona);
   let params=json;
   let headers =new HttpHeaders({'Content-Type':'application/json'});
   return this._http.put(this.url+'persona/'+id,params,{headers})
  }

  deletePersona(id:string){
  return this._http.delete(this.url+'persona/'+id);
  }
}