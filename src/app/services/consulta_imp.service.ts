import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { ConsultaImp } from '../models/consulta_imp';


@Injectable({providedIn:'root'})
export class ConsultaImpService {
  public url!:string;

  constructor( private _http:HttpClient) { 
    this.url=GLOBAL.url
  }
  getDatosMarcaXUnidades(consulta:ConsultaImp){
    let json=JSON.stringify(consulta);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'consulta-top-marcas-unidades',params,{headers})
  }
  getDatosMarcaXFob(consulta:ConsultaImp){
    let json=JSON.stringify(consulta);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'consulta-top-marcas-fob',params,{headers})
  }
  getDatosImportacionesXFob(consulta:ConsultaImp){
    let json=JSON.stringify(consulta);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'consulta-importaciones-fob-unidades',params,{headers})
  }
  getDatosShareXMarca(consulta:ConsultaImp){
    let json=JSON.stringify(consulta);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'consulta-share-por-marcas',params,{headers})
  }
  getDatosShareXSegmento(consulta:ConsultaImp){
    let json=JSON.stringify(consulta);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'consulta-share-por-segmento',params,{headers})
  }
  getDatosPrecioXMarca(consulta:ConsultaImp){
    let json=JSON.stringify(consulta);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'precio-promedio-por-marcas',params,{headers})
  }
  getDatosFobXImportador(consulta:ConsultaImp){
    let json=JSON.stringify(consulta);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'consulta-fob-por-importador',params,{headers})
  }
  getCaracterísticasXMarca(consulta:ConsultaImp){
    let json=JSON.stringify(consulta);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'consulta-características-por-marca',params,{headers})
  }
  getVentasXImportador(consulta:ConsultaImp){
    let json=JSON.stringify(consulta);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json'});
    return this._http.post(this.url+'consulta-ventas-por-importador',params,{headers})
  }
  getAnios(id:number){
    return this._http.get(this.url+'consulta-anios-fecha-despacho'+id)
  }
  getCaracteristicas(id:number){
    return this._http.get(this.url+'consulta-filtro-caracteristicas'+id)
  }
}
