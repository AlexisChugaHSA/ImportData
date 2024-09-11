import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Ciudad } from '../models/ciudad';
import { GLOBAL } from './global.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Producto } from '../models/producto';

@Injectable({providedIn:'root'})
export class EmailService {
  public url!:string;
  private access_token!:string;
  constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
    this.url=GLOBAL.url;
    this.access_token=this.localStorageService.get('token');
  }
  enviarEmailBienvenida(correo:string){
    this.access_token=this.localStorageService.get('token');
    let params= { correo_usuario:correo };
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    return this._http.post(this.url+'correo-bienvenida',params,{headers})
  }
  enviarEmailRestaurarContrasenia(id:number,correo:string){
    this.access_token=this.localStorageService.get('token');
    let params= { id_usuario: id, correo_usuario:correo };
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    return this._http.post(this.url+'correo-restaurar-contrasenia/'+id,params,{headers})
  }
  enviarEmailCaducaProducto(correo:string, productos:Producto[]){
    this.access_token=this.localStorageService.get('token');
    let params= { correo_usuario:correo , productos: productos };
    console.log(params)
    let headers =new HttpHeaders({'Authorization': 'Bearer '+this.access_token});
    return this._http.post(this.url+'producto-por-caducar',{headers})
  }
  enviarEmailConfirmacionCompra(id_pago:number,correo:string){
    this.access_token=this.localStorageService.get('token');
    let params= { correo_usuario:correo , id_pago:id_pago };
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    return this._http.post(this.url+'confirmacion-compra',params,{headers})
  }




/*
  addMembresia(membresia:Membresia){
    
    let json=JSON.stringify(membresia);
    let params=json;
    //console.log(params)
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