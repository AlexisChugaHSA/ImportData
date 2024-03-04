import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartType, registerables,CartesianScaleOptions} from 'chart.js/auto';
import { LocalStorageService } from 'angular-2-local-storage';
import { CategoriaImpService } from '../services/categoria_imp.service';
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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort, Sort } from '@angular/material/sort';

Chart.register(...registerables);
Chart.register(ChartDataLabels);
Chart.defaults.font.weight ='lighter';
Chart.defaults.scale.grid.color='rgba(214, 69, 80,0.4)';

@Component({
  selector: 'app-dashboard-producto',
  templateUrl: './dashboard-producto.component.html',
  styleUrls: ['./dashboard-producto.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0px', display: "none" })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class DashboardProductoComponent implements OnInit,  AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
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
  public consultaImp=new ConsultaImp([],[],[],[],[],[],[]);

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
  public caracteristicas_imp!:any;

  public dataSource_t1:any=[];
  public t1_columnsToDisplay= ['marca', 'unidades', 'fob'];
  public columnsToDisplay_t1 = ['caracteristica', 'car_unidades', 'car_fob']; 
  public expandedElement_t1: PeriodicElement_t1 | null | undefined;
  public bandera_t1=false;
  public sortedDataT1:any=[];


  public dataSource_t2:any=[];
  public t2_columnsToDisplay= ['importador', 'fob', 'unidades'];
  public bandera_t2=false;
  public sortedDataT2:any=[];

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _personaService: PersonaService,
    private _produserService: ProductoUsuarioService,
    private localStorageService: LocalStorageService,
    private _productoService:ProductoService,
    private _categoriaImpService: CategoriaImpService,
    private _tiendaImpService: TiendasImpService,
    private _productoImpService: ProductosImpService,
    private _precioImpService: PreciosImpService,
    private _empresaImpService: EmpresasImpService,
    private _homologacionImpService: HomologacionImpService,
    private _importacionImpService: ImportacionImpService,
    private _importadorImpService: ImportadorImpService,
    private _marcasImpService: MarcasImpService,
    private _consultaImpService: ConsultaImpService,
    private renderer: Renderer2
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
  this.sortedDataT2=this.dataSource_t2.slice();
  this.sortedDataT1=this.dataSource_t1.slice();
   
  }
  ngAfterViewInit(): void {
    this.dataSource_t2.sort = this.sort;
  }
  ngOnDestroy(): void {
    if (this.barras_verticales) {
      this.barras_verticales.destroy();
    }
    if (this.barras_horizontales1) {
      this.barras_horizontales1.destroy();
    }
    if (this.barras_horizontales2) {
      this.barras_horizontales2.destroy();
    }
    if (this.barras_apiladas1) {
      this.barras_apiladas1.destroy();
    }
    if (this.barras_apiladas2) {
      this.barras_apiladas2.destroy();
    }
    if (this.diagrama_lineas) {
      this.diagrama_lineas.destroy();
    }
    if (this.diagrama_pie) {
      this.diagrama_pie.destroy();
    }
  }


  ngOnInit(): void {
    this.getAnios();
    this.getCaracterísticas()
    this.getImportadores();
    this.producto=new Producto(0,0,"","",0,0,"","","");
    this.getProductoD();
    this.id =this.route.snapshot.paramMap.get('id');
    this.getDatosDashboard(this.consultaImp);
 
    this.setDropDownListSettings();
    this.getCategorias();
    this.getTiendas();
    this.getEmpresas();
    this.getHomologaciones();
    this.getImportaciones();
    this.getProductos();
    this.getPrecios();
    this.getMarcas();
  }

  BtnGeneral() {
    const general = document.querySelector('#btn_general');
    const share = document.querySelector('#btn_share');
    const importadores= document.querySelector('#btn_importadores');
    const d_general = document.querySelector('#d_general');
    const d_share = document.querySelector('#d_share');
    const d_importadores = document.querySelector('#d_importadores');

    this.renderer.setStyle(general, 'background-color', 'white');
    this.renderer.setStyle(general, 'border-color', 'gray');
    this.renderer.setStyle(general, 'box-shadow', '0 4px 8px rgba(0, 0, 0, 0.3)');

    this.renderer.setStyle(share, 'background-color', 'transparent'); 
    this.renderer.setStyle(share, 'border-color', 'transparent'); 
    this.renderer.setStyle(share, 'box-shadow', 'none'); 

    this.renderer.setStyle(importadores, 'background-color', 'transparent'); 
    this.renderer.setStyle(importadores, 'border-color', 'transparent'); 
    this.renderer.setStyle(importadores, 'box-shadow', 'none'); 

    this.renderer.setStyle(d_share, 'display', 'none'); 
    this.renderer.setStyle(d_importadores, 'display', 'none'); 
    this.renderer.setStyle(d_general, 'display', 'block'); 

  }

  BtnShare() {
    const general = document.querySelector('#btn_general');
    const share = document.querySelector('#btn_share');
    const importadores= document.querySelector('#btn_importadores');
    const d_general = document.querySelector('#d_general');
    const d_share = document.querySelector('#d_share');
    const d_importadores = document.querySelector('#d_importadores');

    this.renderer.setStyle(share, 'background-color', 'white');
    this.renderer.setStyle(share, 'border-color', 'gray');
    this.renderer.setStyle(share, 'box-shadow', '0 4px 8px rgba(0, 0, 0, 0.3)');

    this.renderer.setStyle(general, 'background-color', 'transparent'); 
    this.renderer.setStyle(general, 'border-color', 'transparent'); 
    this.renderer.setStyle(general, 'box-shadow', 'none'); 

    this.renderer.setStyle(importadores, 'background-color', 'transparent'); 
    this.renderer.setStyle(importadores, 'border-color', 'transparent'); 
    this.renderer.setStyle(importadores, 'box-shadow', 'none'); 

    this.renderer.setStyle(d_general, 'display', 'none'); 
    this.renderer.setStyle(d_importadores, 'display', 'none'); 
    this.renderer.setStyle(d_share, 'display', 'block'); 
  }

  BtnImportadores() {
    const general = document.querySelector('#btn_general');
    const share = document.querySelector('#btn_share');
    const importadores= document.querySelector('#btn_importadores');
    const d_general = document.querySelector('#d_general');
    const d_share = document.querySelector('#d_share');
    const d_importadores = document.querySelector('#d_importadores');
    
    this.renderer.setStyle(importadores, 'background-color', 'white');
    this.renderer.setStyle(importadores, 'border-color', 'gray');
    this.renderer.setStyle(importadores, 'box-shadow', '0 4px 8px rgba(0, 0, 0, 0.3)');

    this.renderer.setStyle(share, 'background-color', 'transparent'); 
    this.renderer.setStyle(share, 'border-color', 'transparent'); 
    this.renderer.setStyle(share, 'box-shadow', 'none'); 

    this.renderer.setStyle(general, 'background-color', 'transparent'); 
    this.renderer.setStyle(general, 'border-color', 'transparent'); 
    this.renderer.setStyle(general, 'box-shadow', 'none'); 

    this.renderer.setStyle(d_general, 'display', 'none'); 
    this.renderer.setStyle(d_share, 'display', 'none'); 
    this.renderer.setStyle(d_importadores, 'display', 'block'); 
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

  getDataBarrasVerticales(resultado:any) {
    const onClickHandler = (event, elements, chart) =>{
        if (elements.length > 0) {
          const clickedElement = elements[0];
          const index = clickedElement.index;
          const isElementSelected = this.consultaImp.anio.includes(resultado[index].anio);
          if (isElementSelected) {
              this.consultaImp.anio=[];
              this.getDatosDashboard(this.consultaImp);
          } else {
              this.consultaImp.anio.push(resultado[index].anio);
              this.getDatosDashboard(this.consultaImp);
          }
}};
    const data: ChartData<'bar' | 'line'> = {
      labels: resultado.map(item => item.anio),
      datasets: [
        {
          label: 'Unidades',
          data: resultado.map(item => item.unidades),
          borderColor: 'rgba(214, 69, 80)',
          backgroundColor: 'rgba(214, 69, 80)',
          fill: false,
          type: 'line',
          yAxisID: 'unidades',
          datalabels: {
            anchor: 'end', 
            align: 'top', 
            backgroundColor:'rgba(226, 122, 130,0.9)', 
            borderRadius:5,
            formatter: function(value, context) {
              return (value / 1000).toFixed(2) + " mil.";
            },
            color:'#000000',
            font: {
             
              size: 8,
          }
        }
        },
        {
          label: 'Fob',
          data: resultado.map(item => item.fob),
          borderColor: 'rgb(17, 141, 255)',
          backgroundColor: 'rgb(17, 141, 255)',
          stack: 'combined',
          type: 'bar',
          yAxisID: 'fob',
          datalabels: {
            anchor: 'end', // Ancla las etiquetas al final de la barra
            align: 'end', // Alinea las etiquetas al final de la barra
            backgroundColor:'rgb( 144, 201, 255,0.9)', 
            borderRadius:5,
            formatter: function(value, context) {
              return "$"+(value / 1000000).toFixed(2) + " mill.";
            },
            color:'#000000',
            font: { 
              size: 8,
          }
        },
        },

      ],
    };
  
    this.barras_verticales = new Chart('chartBarrasVerticales', {
      type: 'scatter', // Tipo principal del gráfico
      data,
      options: {
        plugins:{
          tooltip:{
            callbacks:{
              title(tooltipItems) {
                return "";
              },
             label(tooltipItem:any) {
              console.log("XXXXXXXXXXXXXXX:"+tooltipItem.formattedValue)
              if(tooltipItem.chart.data.datasets[tooltipItem.datasetIndex].label=='Fob'){
                let tooltip=["Fecha-Año   "+tooltipItem.chart.data.labels[tooltipItem.dataIndex]];
                //tooltip.push("FOB U$S     $"+resultado[tooltipItem.dataIndex].fob);
                tooltip.push("FOB U$S     $"+tooltipItem.formattedValue);
                 return tooltip;
              }else{
                let tooltip=["Fecha-Año   "+tooltipItem.chart.data.labels[tooltipItem.dataIndex]];
                //tooltip.push("UNIDADES   "+resultado[tooltipItem.dataIndex].unidades);
                tooltip.push("UNIDADES   "+tooltipItem.formattedValue+",00");
                 return tooltip;           
              }
             },
            }
        },
        },
        scales: {
          x: {
            grid:{
              display:false
            },
            stacked: true, // Apila las barras verticalmente
            title: {
                color:'#000000',
                display: true,
                text: 'Año'
              },
          },
          'fob':{
            border: {
              dash: [2,4],
          },
            position: 'left',
            title: {
              color:'#000000',
              display: true,
              text: 'FOB U$S'
            },
            ticks: {
              callback: function(value) {
                const numericValue: number = typeof value === 'number' ? value : parseFloat(value);
                return "$"+(numericValue / 1000000) + " mill.";},
              font: {
                size: 10 // Ajusta el tamaño de la letra aquí según tu preferencia
              }
            }
          },
          'unidades':{
            grid:{
              display:false
            },
            position: 'right',
            title: {
              color:'#000000',
              display: true,
              text: 'UNIDADES'
            },
            ticks: {
              callback: function(value) {
                const numericValue: number = typeof value === 'number' ? value : parseFloat(value);
                return (numericValue / 1000000) + " mill.";},
              font: {
                size: 10 // Ajusta el tamaño de la letra aquí según tu preferencia
              }
            }
          }
        },
        onClick: onClickHandler,
      }
    });
  }
  

  getDataBarrasHorizontales1(resultado:any) {
    const onClickHandler = (event, elements, chart) =>{
      if (elements.length > 0) {
        const clickedElement = elements[0];
        const index = clickedElement.index;
        
        // Verificar si el elemento ya está seleccionado
        const isElementSelected = this.consultaImp.nombre_marca.includes(resultado[index].nombre_marca);

        if (isElementSelected) {
            // Ejecutar otra función si el elemento ya está seleccionado
            // Puedes llamar a la función que desees aquí
            this.consultaImp.nombre_marca=[];
            this.getDatosDashboard(this.consultaImp);
        } else {
            // Si el elemento no está seleccionado, realizar la acción normal
            this.consultaImp.nombre_marca.push(resultado[index].nombre_marca);
            this.getDatosDashboard(this.consultaImp);
        }
    }
  };
    const data = {
      labels: resultado.map(item => item.nombre_marca),
      datasets: [{
        axis: 'y',
        label: '',
        data: resultado.map(item => parseFloat(item.unidades)),
        fill: false,
        backgroundColor:'rgb(17, 141, 255)',
        borderColor:'rgb(17, 141, 255)',
        borderWidth: 1
      }]
    };
    this.barras_horizontales1 = new Chart('chartBarrasHorizontales1', {
      type: 'bar',
      data,
      options: {
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: {
          tooltip:{
            callbacks:{
              title(tooltipItems) {
                return "";
              },
             label(tooltipItem:any) {
              let tooltip=["MARCA           "+tooltipItem.chart.data.labels[tooltipItem.dataIndex]];
              tooltip.push("UNIDADES      "+tooltipItem.formattedValue+",00");
               return tooltip;
             },
            }
        },
          legend: {
            display: false // Oculta la leyenda y elimina el espacio reservado para ella
          }, 
          datalabels: {
            anchor: 'end', // Ancla las etiquetas al final de la barra
            align: 'end', // Alinea las etiquetas al final de la barra
            backgroundColor:'rgb(17, 141, 255,0.3)', 
            borderRadius:5,
            formatter: function(value, context) {
              return (value / 1000000).toFixed(2) + " mill.";
            },
            font: {
              size: 8,
          }
        },
        },
        scales: {
          x: {
            border: {
              dash: [2,4],
          },
            title: {
              color:'#000000',
              display: true,
              text: 'UNIDADES',
              font: {
                size: 10, // Ajusta el tamaño de la letra aquí según tu preferencia
              }
            },
            ticks: {
              callback: function(value) {
                const numericValue: number = typeof value === 'number' ? value : parseFloat(value);
                return (numericValue / 1000000) + " mill.";
            },
            font: {
              size: 10, // Ajusta el tamaño de la letra aquí según tu preferencia
            }
              }
             
          },
          y: {
            grid:{
              display:false
            },
            title: {
              color:'#000000',
              display: true,
              text: 'MARCA',
              font: {
                size: 10, 
              }
            },
            ticks: {
              font: {
                size: 9, // Ajusta el tamaño de la letra aquí según tu preferencia
              }
            }
          }
        },
        onClick: onClickHandler
      }
    })
  }

  getDataBarrasHorizontales2(resultado:any) {
    const onClickHandler = (event, elements, chart) =>{
      if (elements.length > 0) {
        const clickedElement = elements[0];
        const index = clickedElement.index;
        this.consultaImp.nombre_marca.push(resultado[index].nombre_marca);
        this.getDatosDashboard(this.consultaImp);
        }
};
    const data = {
      labels: resultado.map(item => item.nombre_marca),
      datasets: [{
        axis: 'y',
        label: 'My First Dataset',
        data: resultado.map(item => parseFloat(item.fob)),
        fill: false,
        backgroundColor:'rgb(17, 141, 255)',
        borderColor:'rgb(17, 141, 255)',
        borderWidth: 1
      }]
    };
    this.barras_horizontales2 = new Chart('chartBarrasHorizontales2', {
      type: 'bar',
      data,
      options: {
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: {
          tooltip:{
            callbacks:{
              title(tooltipItems) {
                return "";
              },
             label(tooltipItem:any) {
              let tooltip=["MARCA     "+tooltipItem.chart.data.labels[tooltipItem.dataIndex]];
              tooltip.push("FOB          $"+tooltipItem.formattedValue);
               return tooltip;
             },
            }
        },
          legend: {
            display: false // Oculta la leyenda y elimina el espacio reservado para ella
          },
          datalabels: {
            anchor: 'end', // Ancla las etiquetas al final de la barra
            align: 'end', // Alinea las etiquetas al final de la barra
            backgroundColor:'rgb(17, 141, 255,0.3)', 
            borderRadius:5,
            formatter: function(value, context) {
              return "$"+(value / 1000000).toFixed(2) + " mill.";
            },
            font: {
              size: 8,
          }
        },
        },
        scales: {
          x: {
            border: {
              dash: [2,4],
          },
            title: {
              color:'#000000',
              display: true,
              text: 'FOB'
            },
            ticks: {
              callback: function(value) {
                const numericValue: number = typeof value === 'number' ? value : parseFloat(value);
                return "$"+(numericValue / 1000000) + " mil" + " M";
            },
            font: {
              size: 10 // Ajusta el tamaño de la letra aquí según tu preferencia
            }
              }
          },
          y: {
            grid:{
              display:false
            },
            title: {
              color:'#000000',
              display: true,
              text: 'MARCA',
              font: {
                size: 10, 
              }
            },
            ticks: {
              font: {
                size: 9 // Ajusta el tamaño de la letra aquí según tu preferencia
              }
            }
          }
        },
        onClick: onClickHandler,
      }
    })
  }

  getDataBarrasApiladas1(resultado:any) {
    const aniosUnicos = Array.from(new Set(resultado.map(item => item.anio)));
    const marcasUnicas = Array.from(new Set((resultado as { nombre_marca: string }[]).map(item => item.nombre_marca))).sort((a, b) => a.localeCompare(b));
    console.log(marcasUnicas);
    const datasets2: any=[];
    const data2:any=[];
      for (let i = 0; i < marcasUnicas.length; i++) {
        const data2:any=[];
        for (let j = 0; j < aniosUnicos.length; j++){
          let fobEncontrados!:any;
          let porcentaje_fob=0;
          fobEncontrados = resultado.find(
            (registro) => registro.anio === aniosUnicos[j] && registro.nombre_marca === marcasUnicas[i]
          );
          if(fobEncontrados){porcentaje_fob=fobEncontrados.porcentaje_fob}
         // console.log("Año: ", aniosUnicos[j]," marca: ", marcasUnicas[i], " fob: ", porcentaje_fob);
          data2.push(porcentaje_fob)
        }
       // console.log(" marca: ", marcasUnicas[i], " fob: ",data2)
        const newDataset = {
          label: marcasUnicas[i],
          data: data2, // Aquí puedes agregar los datos respectivos para cada dataset
          backgroundColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
        };
        datasets2.push(newDataset);}
    const data = {
      labels: aniosUnicos,
      datasets: datasets2
      
    };
    this.barras_apiladas1 = new Chart('chartBarrasApiladas1', {
      type: 'bar',
      data,
      options: {
        
        plugins: {
          tooltip:{
            callbacks:{
              title(tooltipItems) {
                return "";
              },
             label(tooltipItem:any) {
              let fob=resultado.find(elemento => elemento.anio==tooltipItem.chart.data.labels[tooltipItem.dataIndex] && elemento.porcentaje_fob ==tooltipItem.dataset.data[tooltipItem.dataIndex] ).fob;
              fob= new Intl.NumberFormat('es-ES', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(fob);
              let tooltip=["Fecha-Año                   "+tooltipItem.chart.data.labels[tooltipItem.dataIndex]];
              tooltip.push("MARCA AGRUPADA    "+resultado.find(elemento => elemento.anio==tooltipItem.chart.data.labels[tooltipItem.dataIndex] && elemento.porcentaje_fob ==tooltipItem.dataset.data[tooltipItem.dataIndex] ).nombre_marca);
              tooltip.push("FOB U$S                      $"+fob+" ("+tooltipItem.dataset.data[tooltipItem.dataIndex]+"%)");
              return tooltip;
             },
            }
        },
          datalabels:{
            display(context:any) {
                return context.dataset.data[context.dataIndex] >= 6;
            },
            formatter: function(value, context) {
                return value+"%";
            },
            color:'rgb(255, 255, 255)',
            backgroundColor:'rgb(128, 128, 128,0.5)', 
            borderRadius:5,
            font: {
              size: 8,
          }
          },
          legend: {
            display: true,
            position:'right',
            align:'center'
        }, 
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
            grid:{
              display:false
            }
          },
          y: {
            max:100,
            stacked: true,
            ticks: {
              callback: function(value) {
                return value+"%";
            },
          },
          border: {
            dash: [2,4],
        },
        },
        }
      }
    })

  }

  getDataBarrasApiladas2(resultado:any) {
    const aniosUnicos = Array.from(new Set(resultado.map(item => item.anio)));
    const CaracteristicasUnicas = Array.from(new Set((resultado as { caracteristica: string }[]).map(item => item.caracteristica)))
    console.log(CaracteristicasUnicas);
    const datasets2: any=[];
    const data2:any=[];
      for (let i = 0; i < CaracteristicasUnicas.length; i++) {
        const data2:any=[];
        for (let j = 0; j < aniosUnicos.length; j++){
          let fobEncontrados!:any;
          let porcentaje_fob=0;
          fobEncontrados = resultado.find(
            (registro) => registro.anio === aniosUnicos[j] && registro.caracteristica === CaracteristicasUnicas[i]
          );
          if(fobEncontrados){porcentaje_fob=fobEncontrados.porcentaje_fob}
          data2.push(porcentaje_fob)
        }
        const newDataset = {
          label: CaracteristicasUnicas[i],
          data: data2, 
          backgroundColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
        };
        datasets2.push(newDataset);}
    const data = {
      labels: aniosUnicos,
      datasets: datasets2
      
    };
    this.barras_apiladas2 = new Chart('chartBarrasApiladas2', {
      type: 'bar',
      data,
      options: {
        
        plugins: {
          tooltip:{
            callbacks:{
              title(tooltipItems) {
                return "";
              },
             label(tooltipItem:any) {
              let fob=resultado.find(elemento => elemento.anio==tooltipItem.chart.data.labels[tooltipItem.dataIndex] && elemento.porcentaje_fob ==tooltipItem.dataset.data[tooltipItem.dataIndex] ).fob;
              fob= new Intl.NumberFormat('es-ES', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(fob);
              let tooltip=["Fecha-Año                         "+tooltipItem.chart.data.labels[tooltipItem.dataIndex]];
              tooltip.push("Caracteristica Agregada    "+resultado.find(elemento => elemento.anio==tooltipItem.chart.data.labels[tooltipItem.dataIndex] && elemento.porcentaje_fob ==tooltipItem.dataset.data[tooltipItem.dataIndex] ).caracteristica);
              tooltip.push("FOB U$S                           $"+fob+" ("+tooltipItem.dataset.data[tooltipItem.dataIndex]+"%)");
               return tooltip;
             },
            }
        },
          datalabels:{
            display(context:any) {
                return context.dataset.data[context.dataIndex] >= 6;
            },
            formatter: function(value, context) {
                return value+"%";
            },
            color:'rgb(255, 255, 255)',
            backgroundColor:'rgb(128, 128, 128,0.5)', 
            borderRadius:5,
            font: {
              size: 8,
          }
          },
          title: {
            display: false,
            text: 'Chart.js Bar Chart - Stacked'
          },
          legend: {
            display: true,
            position:'right',
            align:'center'
        }, 
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
            grid:{
              display:false
            }
          },
          y: {
            max:100,
            stacked: true,
            ticks: {
              callback: function(value) {
                return value+"%";
            },
          },
          border: {
            dash: [2,4],
        },
        },
        }
      }
    })

  }

  getDataDiagramaPie(resultado: any) {
    console.log(resultado.map(item => item.porcentaje_fob+"%"))
    const data = {
      labels: resultado.map(item => item.importador),
      datasets: [{
        labels:"Razon Social:"+resultado.map(item => item.porcentaje_fob),
        data: resultado.map(item => item.porcentaje_fob),
        backgroundColor: Array.from({ length: 20 }, () => this.getRandomRGB()),
        hoverOffset: 4
      }]
    };
    this.diagrama_pie = new Chart('chartPie', {
      type: 'pie' as ChartType,
      data: data,
      options: {
        plugins: {
            tooltip:{
                callbacks:{
                  title(tooltipItems) {
                    return "";
                  },
                 label(tooltipItem:any) {
                  let fob=resultado[tooltipItem.dataIndex].total_fob;
                  fob= new Intl.NumberFormat('es-ES', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(fob);
                  let tooltip=["Razon Social  "+tooltipItem.chart.data.labels[tooltipItem.dataIndex]];
                  tooltip.push("FOB U$S        $"+fob+" ("+tooltipItem.dataset.data[tooltipItem.dataIndex]+"%)");

                   return tooltip;
                 },
                }
            },
            datalabels: {
              anchor: 'end', // Ancla las etiquetas al final de la barra
              align: 'end', // Alinea las etiquetas al final de la barra
              backgroundColor:'rgb(17, 141, 255,0.3)', 
              borderRadius:5,
              formatter: function(value, context:any) {
                let label=context.chart.data.labels[context.dataIndex];
                return label;
                //return "$"+(value / 1000000).toFixed(2) + " mill.";
              },
              font: {
                size: 8,
            }
          },
            legend: {
                display: true,
                position:'top',
                align:'center',
                labels:{
                  padding:10
                },
               
 
            }, 
        }
    }
    
    })
  }
  getRandomRGB(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  getDataDiagramaLineas(resultado:any) {
    const aniosUnicos = Array.from(new Set(resultado.map(item => item.anio)));
    const marcasUnicas = Array.from(new Set((resultado as { nombre_marca: string }[]).map(item => item.nombre_marca))).sort((a, b) => a.localeCompare(b));
    const datasets2: any=[];
    const data2:any=[];
      for (let i = 0; i < marcasUnicas.length; i++) {
        const data2:any=[];
        for (let j = 0; j < aniosUnicos.length; j++){
          let precioEncontrado!:any;
          let precio=0;
          precioEncontrado = resultado.find(
            (registro) => registro.anio === aniosUnicos[j] && registro.nombre_marca === marcasUnicas[i]
          );
          if(precioEncontrado){precio=precioEncontrado.precio_promedio}
          //console.log("Año: ", aniosUnicos[j]," marca: ", marcasUnicas[i], " precio: ", precio);
          data2.push(precio)
        }
        //console.log(" marca: ", marcasUnicas[i], "precio: ",data2)
        const newDataset = {
          label: marcasUnicas[i],
          data: data2, // Aquí puedes agregar los datos respectivos para cada dataset
          borderColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
        };
        datasets2.push(newDataset);}
    const data = {
      labels: aniosUnicos,
      datasets: datasets2
      
    };
    this.diagrama_lineas = new Chart('chartLineas', {
      type: 'line',
      data: data,
      options:{
        scales:{
          x:{
          grid:{
            display:false
          },},
          y:{
          border: {
            dash: [2,4],
        },},
        },
        plugins:{
          tooltip:{
            callbacks:{
              title(tooltipItems) {
                return "";
              },
             label(tooltipItem:any) {
              let tooltip=[tooltipItem.chart.data.labels[tooltipItem.dataIndex]];
              let precio= new Intl.NumberFormat('es-ES', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(tooltipItem.raw);
               return tooltip;
             },
            }
        },
          datalabels: {
            anchor: 'end', 
            align: 'end', 
            formatter: function(value, context:any) {
              return value.toFixed(2);
            },
            font: {
              size: 10,
          }
        }
        }
      }
    })
  }
  /***------------------------TABLAS-------------------------------------------------------- */
  getTablaCaracteristicaXMarcaT1(resultado:any){
    this.dataSource_t1=[];
    for (const marca in resultado) {
      if (resultado.hasOwnProperty(marca)) {
        const marcaInfo = resultado[marca];
        var elemento: {
          marca: string;
          unidades: number;
          fob: number;
          caracteristicas: {
            caracteristica: string;
            car_unidades: number;
            car_fob: number;
          }[];
        } = {
          marca: marcaInfo.marca,
          unidades: parseFloat(marcaInfo.total_unidades),
          fob: marcaInfo.total_fob,
          caracteristicas: []
        };
        for (const caracteristica of marcaInfo.carcateristicas) {
          var caract_elemento: {
            caracteristica: string;
            car_unidades: number;
            car_fob: number;
          } = {
            caracteristica: caracteristica.carcateristica,
            car_unidades:parseFloat( caracteristica.car_unidades),
            car_fob: caracteristica.car_fob
          };
    
          elemento.caracteristicas.push(caract_elemento);
        }
        this.bandera_t1=true;
          this.dataSource_t1.push(elemento)
      }
    }
    this.sortedDataT1=this.dataSource_t1;
  }
  getTablaVentaXImportadorT2(resultado:any){
    this.dataSource_t2=[];
    for (const importador in resultado) {
      if (resultado.hasOwnProperty(importador)) {
        const importadorInfo = resultado[importador];
        var elemento: {
          importador: string;
          unidades: number;
          fob: number;
        } = {
          importador: importadorInfo.importador,
          unidades: parseFloat(importadorInfo.unidades),
          fob: importadorInfo.fob
        };
        this.bandera_t2=true;
          this.dataSource_t2.push(elemento)
      }
    }
    this.sortedDataT2=this.dataSource_t2;
  }

  sortDataT2(sort: Sort) {
    const data = this.dataSource_t2.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedDataT2 = data;
      return;
    }

    this.sortedDataT2 = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'fob':
          return compare(a.fob, b.fob, isAsc);
        case 'unidades':
          return compare(a.unidades, b.unidades, isAsc);
        default:
          return 0;
      }
    });
  }
  sortDataT1(sort: Sort) {
    const data = this.dataSource_t1.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedDataT1 = data;
      return;
    }

    this.sortedDataT1 = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'fob':
          return compare(a.fob, b.fob, isAsc);
        case 'unidades':
          return compare(a.unidades, b.unidades, isAsc);
        default:
          return 0;
      }
    });
  }

  /***-------------------------------------------------------------------------------------- */
  /*
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
*/
  /******Obtener datos para los filtros */
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
      idField: 'caracteristica',
      textField: 'caracteristica',
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
    this.ngOnDestroy();
    this.consultaImp.anio.push(item.anio);
    console.log(this.consultaImp);
    this.getDatosDashboard(this.consultaImp)
  }
  onItemDeSelectAnio(item: any) {
    this.ngOnDestroy();
    const index = this.consultaImp.anio.indexOf(item);
    if (index !== -1) {
      this.consultaImp.anio.splice(index, 1);
      this.getDatosDashboard(this.consultaImp)
    }
    console.log(this.consultaImp);
  }
  onItemSelectMes(item: any) {
    this.ngOnDestroy();
    this.consultaImp.mes.push(item.id_mes);
    console.log(this.consultaImp);
    this.getDatosDashboard(this.consultaImp)
  }
  onItemDeSelectMes(item: any) {
    this.ngOnDestroy();
    const index = this.consultaImp.mes.indexOf(item.id_mes);
    if (index !== -1) {
      this.consultaImp.mes.splice(index, 1);
      this.getDatosDashboard(this.consultaImp)
    }
    console.log(this.consultaImp);
  }
  onItemSelectCaracteristica(item: any) {
    this.ngOnDestroy();
    this.consultaImp.caracteristica.push(item.caracteristica);
    console.log(this.consultaImp);
    this.getDatosDashboard(this.consultaImp)
  }
  onItemDeSelectCaracteristica(item: any) {
    this.ngOnDestroy();
    const index = this.consultaImp.caracteristica.indexOf(item.caracteristica);
    if (index !== -1) {
      this.consultaImp.caracteristica.splice(index, 1);
      this.getDatosDashboard(this.consultaImp)
    }
    console.log(this.consultaImp);
  }

  
  onItemSelectCategoria(item: any) {
    this.ngOnDestroy();
    this.consultaImp.categoria.push(item.nombre_categoria_producto);
    console.log(this.consultaImp);
    this.getDatosDashboard(this.consultaImp)
  }
  onItemDeSelectCategoria(item: any) {
    this.ngOnDestroy();
    const index = this.consultaImp.categoria.indexOf(item.nombre_categoria_producto);
    if (index !== -1) {
      this.consultaImp.categoria.splice(index, 1);
      this.getDatosDashboard(this.consultaImp)
    }
    console.log(this.consultaImp);
  }
  onItemSelectMarca(item: any) {
    this.ngOnDestroy();
    this.consultaImp.nombre_marca.push(item.nombre_marca);
    this.getDatosDashboard(this.consultaImp)
    console.log(this.consultaImp);
  }
  onItemDeSelectMarca(item: any) {
    this.ngOnDestroy();
    const index = this.consultaImp.nombre_marca.indexOf(item.nombre_marca);
    if (index !== -1) {
      this.consultaImp.nombre_marca.splice(index, 1);
      this.getDatosDashboard(this.consultaImp)
    }
    console.log(this.consultaImp);
  }
  onItemSelectEmpresa(item: any) {
    this.ngOnDestroy();
    this.consultaImp.nombre_empresa.push(item.nombre_empresa);
    console.log(this.consultaImp);
    this.getDatosDashboard(this.consultaImp)
  }
  onItemDeSelectEmpresa(item: any) {
    this.ngOnDestroy();
    const index = this.consultaImp.nombre_empresa.indexOf(item.nombre_empresa);
    if (index !== -1) {
      this.consultaImp.nombre_empresa.splice(index, 1);
      this.getDatosDashboard(this.consultaImp)
    }
    console.log(this.consultaImp);
  }
  onItemSelectModelo(item: any) {
    this.ngOnDestroy();
    this.consultaImp.modelo_homologado.push(item.modelo_homologado);
    console.log(this.consultaImp);
    this.getDatosDashboard(this.consultaImp)
  }
  onItemDeSelectModelo(item: any) {
    this.ngOnDestroy();
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
 
    this.consultaImp.caracteristica=[];
    this.getDatosDashboard(this.consultaImp);
  }
  onSelectAllCategoria(items: any) {
    this.ngOnDestroy();
    this.consultaImp.categoria=[];
    this.getDatosDashboard(this.consultaImp);
  }
  onSelectAllMarca(items: any) {
    this.ngOnDestroy();
    this.consultaImp.nombre_marca=[];
    this.getDatosDashboard(this.consultaImp);
  }
  onSelectAllEmpresa(items: any) {
    this.ngOnDestroy();
    this.consultaImp.nombre_empresa=[];
    this.getDatosDashboard(this.consultaImp);
  }
  onSelectAllModelo(items: any) {
    this.ngOnDestroy();
    this.consultaImp.modelo_homologado=[];
    this.getDatosDashboard(this.consultaImp);
  }


  getDatosDashboard(consulta:ConsultaImp){
    this.ngOnDestroy();
    this._consultaImpService.getDatosMarcaXUnidades(consulta).subscribe(
      result1=>{
        this.getDataBarrasHorizontales1(result1);
      },
      error=>{
        console.log(<any>error)
      }
    )
    this._consultaImpService.getDatosMarcaXFob(consulta).subscribe(
      result2=>{
        console.log(result2);
        this.getDataBarrasHorizontales2(result2);
      },
      error=>{
        console.log(<any>error)
      }
    )
    this._consultaImpService.getDatosImportacionesXFob(consulta).subscribe(
      result3=>{
        console.log(result3);
        this.getDataBarrasVerticales(result3);
      },
      error=>{
        console.log(<any>error)
      }
    )
    this._consultaImpService.getDatosShareXMarca(consulta).subscribe(
      result4=>{
        console.log(result4);
        this.getDataBarrasApiladas1(result4);
      },
      error=>{
        console.log(<any>error)
      }
    )

    this._consultaImpService.getDatosPrecioXMarca(consulta).subscribe(
      result5=>{
        console.log(result5);
        this.getDataDiagramaLineas(result5);
      },
      error=>{
        console.log(<any>error)
      }
    )
    this._consultaImpService.getDatosFobXImportador(consulta).subscribe(
      result6=>{
        console.log(result6);
        this.getDataDiagramaPie(result6);
      },
      error=>{
        console.log(<any>error)
      }
    )
    this._consultaImpService.getDatosShareXSegmento(consulta).subscribe(
      result7=>{
        console.log(result7);
        this.getDataBarrasApiladas2(result7);
      },
      error=>{
        console.log(<any>error)
      }
    )
    this._consultaImpService.getCaracterísticasXMarca(consulta).subscribe(
      result8=>{
        console.log(result8);
        this.getTablaCaracteristicaXMarcaT1(result8);
      },
      error=>{
        console.log(<any>error)
      }
    )
    this._consultaImpService.getVentasXImportador(consulta).subscribe(
      result9=>{
        console.log(result9);
        this.getTablaVentaXImportadorT2(result9);
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
    const aniosDespachoSet = new Set<number>();
    /*
    this._importacionImpService.getImportaciones().subscribe(
      result=>{

        this.importaciones_imp=result;
        this.importaciones_imp.forEach(item => {
          const fechaDespacho = new Date(item.fecha_despacho);
          const anioDespacho = fechaDespacho.getFullYear();
          aniosDespachoSet.add(anioDespacho);
      });
      this.anios= Array.from(aniosDespachoSet).sort((a, b) => a - b);
      this.anios.shift();
      console.log(this.anios)
      },
      error=>{
        console.log(<any>error)
      }
    )*/
  }
  getCaracterísticas(){
    this._consultaImpService.getCaracteristicas().subscribe(
      result=>{
        this.caracteristicas_imp=result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  getAnios(){
    this._consultaImpService.getAnios().subscribe(
      result=>{
        this.anios=result;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

}

export interface PeriodicElement_t1 {
  marca: string;
  unidades: number;
  fob: string;
  caracteristicas: Caracteristica[];
}

export interface Caracteristica {
  caracteristica: string;
  car_unidades: number;
  car_fob: string;
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
