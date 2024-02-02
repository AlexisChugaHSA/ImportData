import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Producto } from '../models/producto';
import { GLOBAL } from './global.service';


@Injectable({providedIn:'root'})
export class ProductoService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getProductos(){
    return this._http.get(this.url+'productos')
  }
/*
  addMembresia(membresia:Membresia){
    
    let json=JSON.stringify(membresia);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'membresias',params,{headers})
  }
*/
  getProducto(id:number){
    return this._http.get(this.url+'producto/'+id)
  }

  getCatProd(id:number){
    return this._http.get(this.url+'categoria/'+id)
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