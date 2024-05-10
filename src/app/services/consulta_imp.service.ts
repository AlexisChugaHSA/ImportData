import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { ConsultaImp } from '../models/consulta_imp';
import { LocalStorageService } from 'angular-2-local-storage';


@Injectable({providedIn:'root'})
export class ConsultaImpService {
  public url!:string;
  private access_token!:string;

  constructor( private _http:HttpClient,private localStorageService: LocalStorageService) { 
    this.url=GLOBAL.url;
    this.access_token=this.localStorageService.get('token');
  }
  getDatosMarcaXUnidades(consulta:ConsultaImp){
    this.access_token=this.localStorageService.get('token');
    let json=JSON.stringify(consulta);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    return this._http.post(this.url+'consulta-top-marcas-unidades',params,{headers})
  }
  getDatosMarcaXFob(consulta:ConsultaImp){
    this.access_token=this.localStorageService.get('token');
    let json=JSON.stringify(consulta);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    return this._http.post(this.url+'consulta-top-marcas-fob',params,{headers})
  }
  getDatosImportacionesXFob(consulta:ConsultaImp){
    this.access_token=this.localStorageService.get('token');
    let json=JSON.stringify(consulta);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    return this._http.post(this.url+'consulta-importaciones-fob-unidades',params,{headers})
  }
  getDatosShareXMarca(consulta:ConsultaImp){
    this.access_token=this.localStorageService.get('token');
    let json=JSON.stringify(consulta);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    return this._http.post(this.url+'consulta-share-por-marcas',params,{headers})
  }
  getDatosShareXSegmento(consulta:ConsultaImp){
    this.access_token=this.localStorageService.get('token');
    let json=JSON.stringify(consulta);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    return this._http.post(this.url+'consulta-share-por-segmento',params,{headers})
  }
  getDatosPrecioXMarca(consulta:ConsultaImp){
    this.access_token=this.localStorageService.get('token');
    let json=JSON.stringify(consulta);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    return this._http.post(this.url+'precio-promedio-por-marcas',params,{headers})
  }
  getDatosFobXImportador(consulta:ConsultaImp){
    this.access_token=this.localStorageService.get('token');
    let json=JSON.stringify(consulta);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    return this._http.post(this.url+'consulta-fob-por-importador',params,{headers})
  }
  getCaracterísticasXMarca(consulta:ConsultaImp){
    this.access_token=this.localStorageService.get('token');
    let json=JSON.stringify(consulta);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    return this._http.post(this.url+'consulta-características-por-marca',params,{headers})
  }
  getVentasXImportador(consulta:ConsultaImp){
    this.access_token=this.localStorageService.get('token');
    let json=JSON.stringify(consulta);
    let params=json;
    console.log(params)
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    return this._http.post(this.url+'consulta-ventas-por-importador',params,{headers})
  }
  getAnios(id:number){
    this.access_token=this.localStorageService.get('token');
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    console.log(headers)
    return this._http.get(this.url+'consulta-anios-fecha-despacho/'+id,{headers})
  }
  getCaracteristicas(id:number){
    this.access_token=this.localStorageService.get('token');
    let headers =new HttpHeaders({'Content-Type':'application/json','Authorization': 'Bearer '+this.access_token});
    return this._http.get(this.url+'consulta-filtro-caracteristicas/'+id,{headers})
  }
}
