import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Persona } from '../models/persona';
import { GLOBAL } from './global.service';
import { LocalStorageService } from 'angular-2-local-storage';


@Injectable({providedIn:'root'})
export class PersonaService {
  public url!:string;
  private access_token!:string;
  constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
    this.url=GLOBAL.url;
    this.access_token=this.localStorageService.get('token');
  }
  getPersonas(){
    this.access_token=this.localStorageService.get('token');
    let headers =new HttpHeaders({'Authorization': 'Bearer '+this.access_token});
    return this._http.get(this.url+'personas',{headers})
  }

  addPersona(persona:Persona){
    this.access_token=this.localStorageService.get('token');
    let json=JSON.stringify(persona);
    let params=json;
    //console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    return this._http.post(this.url+'persona',params,{headers})
  }

  getPersona(id:number){
    this.access_token=this.localStorageService.get('token');
    let headers =new HttpHeaders({'Authorization': 'Bearer '+this.access_token});
    return this._http.get(this.url+'persona/'+id,{headers})
  }
  getPersonaByUser(id:number){
    this.access_token=this.localStorageService.get('token');
    let headers =new HttpHeaders({'Authorization': 'Bearer '+this.access_token});
    //console.log(headers)
    return this._http.get(this.url+'persona-by-user/'+id,{headers})
  }

  editPersona(id:number, persona:Persona){
    this.access_token=this.localStorageService.get('token');
   let json=JSON.stringify(persona);
   let params=json;
   let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
   return this._http.put(this.url+'persona/'+id,params,{headers})
  }

  deletePersona(id:string){
    this.access_token=this.localStorageService.get('token');
  let headers =new HttpHeaders({'Authorization': 'Bearer '+this.access_token});
  return this._http.delete(this.url+'persona/'+id,{headers});
  }
}