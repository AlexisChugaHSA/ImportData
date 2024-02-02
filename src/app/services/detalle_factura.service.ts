import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { DetalleFactura} from '../models/detalle_factura';
import { GLOBAL } from './global.service';

@Injectable({providedIn:'root'})
export class DetalleFacturaService {
  public url!:string;
  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }


  addDetFactura(detFactura:DetalleFactura){
    
    let json=JSON.stringify(detFactura);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'detalle-factura',params,{headers})
  }
  getDetFactByIdFact(id:number){
    return this._http.get(this.url+'detalle-facturas-fact/'+id)
  }


}