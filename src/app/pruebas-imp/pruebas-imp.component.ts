import { Component } from '@angular/core';
import { GLOBAL } from '../services/global.service';

import { CategoriaImp } from '../models/categoria_imp';
import { CategoriaImpService } from '../services/categoria_imp.service';

import { EmpresasImp } from '../models/empresas_imp';
import { EmpresasImpService } from '../services/empresas_imp.service';

import { MarcasImpService } from '../services/marcas_imp.service';

import { TiendasImp } from '../models/tiendas_imp';
import { TiendasImpService } from '../services/tiendas_imp.service';

import { PreciosImp } from '../models/precios_imp';
import { PreciosImpService } from '../services/precios_imp.service';

import { ProductosImp } from '../models/productos_imp';
import { ProductosImpService } from '../services/productos_imp.service';

import { HomologacionImp } from '../models/homologacion_imp';
import { HomologacionImpService } from '../services/homologacion_imp.service';

import { ImportacionImp } from '../models/importacion_imp';
import { ImportacionImpService } from '../services/importacion_imp.service';

import { ImportadorImp } from '../models/importador_imp';
import { ImportadorImpService } from '../services/importador_imp.service';

import { IDropdownSettings} from 'ng-multiselect-dropdown';
import { ConsultaImp } from '../models/consulta_imp';
import { ConsultaImpService } from '../services/consulta_imp.service';


@Component({
  selector: 'app-pruebas-imp',
  templateUrl: './pruebas-imp.component.html',
  styleUrls: ['./pruebas-imp.component.css']
})
export class PruebasImpComponent {
  public categoria_imp!: CategoriaImp;
  public categorias_imp!:any;

  public tienda_imp!: TiendasImp;
  public tiendas_imp!: any;

  public producto_imp!: ProductosImp;
  public productos_imp!: any;

  public precio_imp!: PreciosImp;
  public precios_imp!: any;

  public empresa_imp!: EmpresasImp;
  public empresas_imp!: any;

  public homologacion_imp!: HomologacionImp;
  public homologaciones_imp!: any

  public importacion_imp!: ImportacionImp;
  public importaciones_imp!: any;

  public importador_imp!: ImportadorImp;
  public importadores_imp!: any;

  public marcas_imp!: any;
  public consulta_resultado!: any;
  public consultaImp=new ConsultaImp([],[],[],[],[],[],[]);




  dropdownSettings!: IDropdownSettings;
  dropdownList !: any;
  selectedItems !: any;
  dropdownSettings_año!: IDropdownSettings;
  dropdownSettings_mes!: IDropdownSettings;
  dropdownSettings_caracteristica!: IDropdownSettings;
  dropdownSettings_categoria!: IDropdownSettings;
  dropdownSettings_marca!: IDropdownSettings;
  dropdownSettings_empresa!: IDropdownSettings;
  dropdownSettings_modelo!: IDropdownSettings;

  constructor(
    private _categoriaImpService: CategoriaImpService,
    private _tiendaImpService: TiendasImpService,
    private _productoImpService: ProductosImpService,
    private _precioImpService: PreciosImpService,
    private _empresaImpService: EmpresasImpService,
    private _homologacionImpService: HomologacionImpService,
    private _importacionImpService: ImportacionImpService,
    private _importadorImpService: ImportadorImpService,
    private _marcasImpService: MarcasImpService,
    private _consultaImpService: ConsultaImpService
  ){
   
  }

  ngOnInit(){

   this.setDropDownListSettings();
    this.getCategorias();
    this.getTiendas();
    this.getEmpresas();
    this.getHomologaciones();
    this.getImportaciones();
    this.getProductos();
    this.getImportadores();
    this.getPrecios();
    this.getMarcas();

    this.getCategoria(1);
    this.getTienda(1);
    this.getEmpresa(1);
    this.getHomologacion(1);
    this.getImportacion(1);
    this.getProducto(1);
    this.getImportador(1);
    this.getPrecio(1);
  }

  setDropDownListSettings(){
    this.dropdownSettings_caracteristica = {
      singleSelection: false,
      idField: 'id_modelo_homologado',
      textField: 'caracteristica_modelo',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
    this.dropdownSettings_categoria = {
      singleSelection: false,
      idField: 'id_categoria_producto',
      textField: 'nombre_categoria_producto',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
    this.dropdownSettings_marca= {
      singleSelection: false,
      idField: 'id_marca',
      textField: 'nombre_marca',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
    this.dropdownSettings_empresa= {
      singleSelection: false,
      idField: 'id_empresa',
      textField: 'nombre_empresa',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
    this.dropdownSettings_modelo= {
      singleSelection: false,
      idField: 'id_modelo_homologado',
      textField: 'modelo_homologado',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onItemSelectCaracteristica(item: any) {
    this.consultaImp.caracteristica_modelo.push(item.caracteristica_modelo);
    console.log(this.consultaImp);
    this.getDatosDashboard(this.consultaImp)
  }
  onItemDeSelectCaracteristica(item: any) {
    const index = this.consultaImp.caracteristica_modelo.indexOf(item.caracteristica_modelo);
    if (index !== -1) {
      this.consultaImp.caracteristica_modelo.splice(index, 1);
      this.getDatosDashboard(this.consultaImp)
    }
    console.log(this.consultaImp);
  }

  
  onItemSelectCategoria(item: any) {
    this.consultaImp.categoria.push(item.nombre_categoria_producto);
    console.log(this.consultaImp);
    this.getDatosDashboard(this.consultaImp)
  }
  onItemDeSelectCategoria(item: any) {
    const index = this.consultaImp.categoria.indexOf(item.nombre_categoria_producto);
    if (index !== -1) {
      this.consultaImp.categoria.splice(index, 1);
      this.getDatosDashboard(this.consultaImp)
    }
    console.log(this.consultaImp);
  }


  onItemSelectMarca(item: any) {
    this.consultaImp.nombre_marca.push(item.nombre_marca);
    this.getDatosDashboard(this.consultaImp)
    console.log(this.consultaImp);
  }
  onItemDeSelectMarca(item: any) {
    const index = this.consultaImp.nombre_marca.indexOf(item.nombre_marca);
    if (index !== -1) {
      this.consultaImp.nombre_marca.splice(index, 1);
      this.getDatosDashboard(this.consultaImp)
    }
    console.log(this.consultaImp);
  }


  onItemSelectEmpresa(item: any) {
    this.consultaImp.nombre_empresa.push(item.nombre_empresa);
    console.log(this.consultaImp);
    this.getDatosDashboard(this.consultaImp)
  }
  onItemDeSelectEmpresa(item: any) {
    const index = this.consultaImp.nombre_empresa.indexOf(item.nombre_empresa);
    if (index !== -1) {
      this.consultaImp.nombre_empresa.splice(index, 1);
      this.getDatosDashboard(this.consultaImp)
    }
    console.log(this.consultaImp);
  }


  onItemSelectModelo(item: any) {
    this.consultaImp.modelo_homologado.push(item.modelo_homologado);
    console.log(this.consultaImp);
    this.getDatosDashboard(this.consultaImp)
  }
  onItemDeSelectModelo(item: any) {
    const index = this.consultaImp.modelo_homologado.indexOf(item.modelo_homologado);
    if (index !== -1) {
      this.consultaImp.modelo_homologado.splice(index, 1);
      this.getDatosDashboard(this.consultaImp)
    }
    console.log(this.consultaImp);
  }


  onSelectAll(items: any) {
    console.log(items);
  }
  onSelectAllCaracteristica(items: any) {
    console.log(items);
  }
  onSelectAllCategoria(items: any) {
    console.log(items);
  }
  onSelectAllMarca(items: any) {
    console.log(items);
  }
  onSelectAllEmpresa(items: any) {
    console.log(items);
  }
  onSelectAllModelo(items: any) {
    console.log(items);
  }





  getDatosDashboard(consulta:ConsultaImp){
   /* this._consultaImpService.getDatos(consulta).subscribe(
      result=>{
        console.log(result);
        this.consulta_resultado=result;
        
      },
      error=>{
        console.log(<any>error)
      }
    )*/
  }

  getMarcas(){
    this._marcasImpService.getMarcas().subscribe(
      result=>{
        console.log(result);
        this.marcas_imp=result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
  getCategorias(){
    this._categoriaImpService.getCategoriasImp().subscribe(
      result=>{
        console.log(result);
        this.categorias_imp=result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  getEmpresas(){
    this._empresaImpService.getEmpresasImp().subscribe(
      result=>{
        console.log(result)
        this.empresas_imp=result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  getTiendas(){
    this._tiendaImpService.getTiendas().subscribe(
      result=>{
        console.log(result)
        this.tiendas_imp=result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  getProductos(){
    this._productoImpService.getProductos().subscribe(
      result=>{
        console.log(result)
        this.productos_imp=result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  getPrecios(){
    this._precioImpService.getPrecios().subscribe(
      result=>{
        console.log(result)
        this.precios_imp=result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  getHomologaciones(){
    this._homologacionImpService.getHomologaciones().subscribe(
      result=>{
        console.log(result)
        this.homologaciones_imp=result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  getImportadores(){
    this._importadorImpService.getImportadores().subscribe(
      result=>{
        console.log(result)
        this.importadores_imp=result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  getImportaciones(){
    this._importacionImpService.getImportaciones().subscribe(
      result=>{
        console.log(result)
        this.importaciones_imp=result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
  /******************************************************************************** */
  getCategoria(id:number){
    this._categoriaImpService.getCategoriaImp(id).subscribe(
      result=>{
        console.log(result);
        this.categoria_imp=<CategoriaImp>result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  getEmpresa(id:number){
    this._empresaImpService.getEmpresaImp(id).subscribe(
      result=>{
        console.log(result)
        this.empresa_imp=<EmpresasImp>result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  getTienda(id:number){
    this._tiendaImpService.getTienda(id).subscribe(
      result=>{
        console.log(result)
        this.tienda_imp=<TiendasImp>result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  getProducto(id:number){
    this._productoImpService.getProducto(id).subscribe(
      result=>{
        console.log(result)
        this.producto_imp=<ProductosImp>result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  getPrecio(id:number){
    this._precioImpService.getPrecio(id).subscribe(
      result=>{
        console.log(result)
        this.precio_imp=<PreciosImp>result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  getHomologacion(id:number){
    this._homologacionImpService.getHomologacion(id).subscribe(
      result=>{
        console.log(result)
        this.homologacion_imp=<HomologacionImp>result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  getImportador(id:number){
    this._importadorImpService.getImportador(id).subscribe(
      result=>{
        console.log(result)
        this.importador_imp=<ImportadorImp>result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  getImportacion(id:number){
    this._importacionImpService.getImportacion(id).subscribe(
      result=>{
        console.log(result)
        this.importacion_imp=<ImportacionImp>result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
}
