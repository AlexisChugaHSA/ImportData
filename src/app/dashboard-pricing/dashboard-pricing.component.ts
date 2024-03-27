import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, ChartData, ChartType } from 'chart.js/auto';
import { LocalStorageService } from 'angular-2-local-storage';
import { SubCategoriaImpService } from '../services/categoria_imp.service';
import { EmpresasImpService } from '../services/empresas_imp.service';
import { MarcasImpService } from '../services/marcas_imp.service';
import { TiendasImpService } from '../services/tiendas_imp.service';
import { PreciosImpService } from '../services/precios_imp.service';
import { ProductosImpService } from '../services/productos_imp.service';
import { HomologacionImpService } from '../services/homologacion_imp.service';
import { ImportacionImpService } from '../services/importacion_imp.service';
import { ImportadorImpService } from '../services/importador_imp.service';
import { IDropdownSettings} from 'ng-multiselect-dropdown';
import { ConsultaImp } from '../models/consulta_imp';
import { ConsultaImpService } from '../services/consulta_imp.service';
import { Producto } from '../models/producto';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { PersonaService } from '../services/persona.service';
import { ProductoUsuarioService } from '../services/producto_usuario.service';
import { Usuario } from '../models/usuario';
import { Persona } from '../models/persona';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard-pricing',
  templateUrl: './dashboard-pricing.component.html',
  styleUrls: ['./dashboard-pricing.component.css']
})
export class DashboardPricingComponent {
  public barras_verticales!: Chart;
  public barras_horizontales1!: Chart;
  public barras_horizontales2!: Chart;
  public barras_apiladas1!: Chart;
  public barras_apiladas2!: Chart;
  public diagrama_pie!: Chart;
  public diagrama_lineas!: Chart;

  public categorias_imp!:any;
  public tiendas_imp!: any;
  public productos_imp!: any;
  public precios_imp!: any;
  public empresas_imp!: any;
  public homologaciones_imp!: any
  public importaciones_imp!: any;
  public importadores_imp!: any;

  public marcas_imp!: any;
  public consulta_resultado!: any;
  public consultaImp=new ConsultaImp(0,[],[],[],[],[],[],[]);

  dropdownSettings!: IDropdownSettings;
  dropdownList !: any;
  selectedItems !: any;
  dropdownSettings_anio!: IDropdownSettings;
  dropdownSettings_mes!: IDropdownSettings;
  dropdownSettings_caracteristica!: IDropdownSettings;
  dropdownSettings_categoria!: IDropdownSettings;
  dropdownSettings_marca!: IDropdownSettings;
  dropdownSettings_empresa!: IDropdownSettings;
  dropdownSettings_modelo!: IDropdownSettings;
  
  public id!:any;
  public producto!:Producto;
  public usuario: any;
  public persona: any;
  public prodsUser: any = [];
  public productos: any = [];
  public anios!:any;
  public meses!: any;
  
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _personaService: PersonaService,
    private _produserService: ProductoUsuarioService,
    private localStorageService: LocalStorageService,
    private _productoService:ProductoService,
    private _categoriaImpService: SubCategoriaImpService,
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
    this.usuario = new Usuario(45, "alexischuga12345@gmail.com", "", "");
    this.persona=new Persona(0,0,0,0,"","","","");
    this.meses= [
      { id_mes: "01", mes: "enero" },
      { id_mes: "02", mes: "febrero" },
      { id_mes: "03", mes: "marzo" },
      { id_mes: "04", mes: "abril" },
      { id_mes: "05", mes: "mayo" },
      { id_mes: "06", mes: "junio" },
      { id_mes: "07", mes: "julio" },
      { id_mes: "08", mes: "agosto" },
      { id_mes: "09", mes: "septiembre" },
      { id_mes: "10", mes: "octubre" },
      { id_mes: "11", mes: "noviembre" },
      { id_mes: "12", mes: "diciembre" }
  ];
   
  }

  ngOnInit(): void {
    this.producto=new Producto(0,0,"","",0,0,"","","");
    this.getProductoD();
    this.id =this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.getDataBarrasVerticales();
    this.getDataBarrasHorizontales1();
    this.getDataBarrasHorizontales2();
    this.getDataBarrasApiladas1();
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
  }
  dirigirDashboardImp(){
    this._router.navigate(['/home']).then(() =>
      this._router.navigate(['/dashboard-producto', this.id])
  );
  }
  dirigirDashboardPri(){
    this._router.navigate(['/home']).then(() =>
      this._router.navigate(['/dashboard-pricing', this.id])
  );
  }
  getProductoD(){
    this._produserService.getP_U(this.usuario.id_usuario).subscribe(
      result => {
        this.prodsUser= <any[]>result;
        console.log(this.prodsUser);
        const existe = this.prodsUser.some(item =>item.id_producto.toString()===this.id);
      if(existe) {
        this._productoService.getProducto(this.id).subscribe(
          result=>{
            this.producto=<Producto>result;
          },
          error=>{
            console.log(<any>error)
          }
        )
  }
  })}



  getDataBarrasHorizontales1() {
    const data = {
      labels: ['Enero', 'Febrero', 'Marzos', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [{
        axis: 'y',
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };
    this.barras_horizontales1 = new Chart('chartBarrasHorizontales1', {
      type: 'bar',
      data,
      options: {
        indexAxis: 'y',
      }
    })
  }

  getDataBarrasHorizontales2() {
    const data = {
      labels: ['Enero', 'Febrero', 'Marzos', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [{
        axis: 'y',
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };
    this.barras_horizontales2 = new Chart('chartBarrasHorizontales2', {
      type: 'bar',
      data,
      options: {
        indexAxis: 'y',
      }
    })
  }

  getDataBarrasApiladas1() {
    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Dataset 2',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: 'rgb(255, 205, 86)',
        },
        {
          label: 'Dataset 3',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: 'rgb(153, 102, 255)',
        },
      ]
    };
    this.barras_apiladas1 = new Chart('chartBarrasApiladas1', {
      type: 'bar',
      data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked'
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    })
  }

 

  getDataBarrasVerticales() {
    const data: ChartData<'bar' | 'line'> = {
      labels: ['Enero', 'Febrero', 'Marzos', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
        {
          label: 'Dataset 1 (Barras)',
          data: [65, 59, 80, 91, 56, 55, 40],
          borderColor: 'rgba(255, 99, 132, 0.2)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          stack: 'combined',
          type: 'bar',
        },

      ],
    };
  
    this.barras_verticales = new Chart('chartBarrasVerticales', {
      type: 'bar', // Tipo principal del gráfico
      data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Combined Bar/Line Chart',
          },
        },
        scales: {
          y: {
            stacked: true,
          },
        },
       // responsive: true, // Permitir responsividad del gráfico
       // maintainAspectRatio: false, // Permitir modificar el aspect ratio
        // Establecer el ancho y alto del gráfico
        //width: 600,
        //height: 400,
      },
    });
  }

  setDropDownListSettings(){
    this.dropdownSettings_anio = {
      singleSelection: false,
      idField: 'anio',
      textField: 'anio',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Deseleccionar todos',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
    this.dropdownSettings_mes = {
      singleSelection: false,
      idField: 'id_mes',
      textField: 'mes',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
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
  onItemSelectAnio(item: any) {
    this.consultaImp.anio.push(item);
    console.log(this.consultaImp);
    this.getDatosDashboard(this.consultaImp)
  }
  onItemDeSelectAnio(item: any) {
    const index = this.consultaImp.anio.indexOf(item);
    if (index !== -1) {
      this.consultaImp.anio.splice(index, 1);
      this.getDatosDashboard(this.consultaImp)
    }
    console.log(this.consultaImp);
  }
  onItemSelectMes(item: any) {
    this.consultaImp.mes.push(item.id_mes);
    console.log(this.consultaImp);
    this.getDatosDashboard(this.consultaImp)
  }
  onItemDeSelectMes(item: any) {
    const index = this.consultaImp.mes.indexOf(item.id_mes);
    if (index !== -1) {
      this.consultaImp.mes.splice(index, 1);
      this.getDatosDashboard(this.consultaImp)
    }
    console.log(this.consultaImp);
  }
  onItemSelectCaracteristica(item: any) {
    this.consultaImp.caracteristica.push(item.caracteristica);
    console.log(this.consultaImp);
    this.getDatosDashboard(this.consultaImp)
  }
  onItemDeSelectCaracteristica(item: any) {
    const index = this.consultaImp.caracteristica.indexOf(item.caracteristica);
    if (index !== -1) {
      this.consultaImp.caracteristica.splice(index, 1);
      this.getDatosDashboard(this.consultaImp)
    }
    console.log(this.consultaImp);
  }

  
  onItemSelectCategoria(item: any) {
    this.consultaImp.subcategoria.push(item.nombre_categoria_producto);
    console.log(this.consultaImp);
    this.getDatosDashboard(this.consultaImp)
  }
  onItemDeSelectCategoria(item: any) {
    const index = this.consultaImp.subcategoria.indexOf(item.nombre_categoria_producto);
    if (index !== -1) {
      this.consultaImp.subcategoria.splice(index, 1);
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
    this._consultaImpService.getDatosMarcaXUnidades(consulta).subscribe(
      result=>{
        console.log(result);
        this.consulta_resultado=result; 
      },
      error=>{
        console.log(<any>error)
      }
    )
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
    this._categoriaImpService.getSubCategoriasImp().subscribe(
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
    const aniosDespachoSet = new Set<number>();
    this._importacionImpService.getImportaciones().subscribe(
      result=>{
        console.log(result)
        this.importaciones_imp=result;
        this.importaciones_imp.forEach(item => {
          const fechaDespacho = new Date(item.fecha_despacho);
          const anioDespacho = fechaDespacho.getFullYear();
          aniosDespachoSet.add(anioDespacho);
      });
      this.anios= Array.from(aniosDespachoSet).sort((a, b) => a - b);
      console.log(this.anios)
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

}
