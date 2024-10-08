import { Component } from '@angular/core';
import { PersonaService } from '../services/persona.service';
import { Persona } from '../models/persona';
import { Empresa } from '../models/empresa';
import { Usuario } from '../models/usuario';
import { EmpresaService } from '../services/empresa.service';
import { DetalleFacturaService } from '../services/detalle_factura.service';
import { FacturaService } from '../services/factura.service';
import { Pais } from '../models/pais';
import { Ciudad } from '../models/ciudad';
import { PaisService } from '../services/pais.service';
import { CiudadService } from '../services/ciudad.service';
import { Direccion } from '../models/direccion';
import { DireccionService } from '../services/direccion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Factura } from '../models/factura';
import { ProductoService } from '../services/producto.service';
import { Pago } from '../models/pago';
import { PagoService } from '../services/pago.service';
import { MembresiaService } from '../services/membresia.service';
import { Membresia } from '../models/membresia';
import { AuthService } from '../services/login.service';
import { PopupCargandoComponent } from '../popup-cargando/popup-cargando.component';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css']
})
export class DetalleFacturaComponent {
  public sidenavVisible = false;
  public persona!: Persona;
  public empresa=new Empresa(0,0,"",0,"","","");
  public usuario: Usuario= new Usuario(0, "", "", "");
  public direccionE=new Direccion(0,0,0);
  public paisE=new Pais(0,"","");
  public ciudadE= new Ciudad(0,0,"","");
  public id!: any;
  public factura=  new Factura(0,0,0,0,"",0,0,"","","","",0);
  public detfacts!: any;
  public productos: any = [];
  public pago=new Pago(0,0,0,0,0,"",0,0,"",0,"");
  public membresias: any = [];
  public membresia=new Membresia("",0,0);
  public periodo = "";
  public total = 0;
  public login=false;
  public dialogRef!:any;

  constructor(
    private authService: AuthService,
    private _router: Router,
    private route: ActivatedRoute,
    private _pagoService: PagoService,
    private _personaService: PersonaService,
    private _empresaService: EmpresaService,
    private _detfactService: DetalleFacturaService,
    private _facturaService: FacturaService,
    private _direccionService: DireccionService,
    private _paisService: PaisService,
    private _ciudadService: CiudadService,
    private _productoService: ProductoService,
    private _membresiaService: MembresiaService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) {
    this.dialogRef = this.dialog.open(PopupCargandoComponent);
    this.authService.getIsLoggedIn().subscribe(
      result => {
        let mensaje=result
        this.login=mensaje.login;
        if(this.login){
          //console.log(mensaje.login)
        }
        else{
          this._router.navigate(['/login'])
        }
        
      },
      error => {
        this._router.navigate(['/login'])
        //console.log(error)
        this.login=false;
        
      })

  }
  ngOnInit() {
    this.usuario.id_usuario=this.localStorageService.get('id_usuario')
    this.id = this.route.snapshot.paramMap.get('id');
    this.obtenerDatosEmpresa();
    this.obtenerFactura();
    this.obtenerProductos();
    
  }
  toggleSidenav(event: Event) {
    event.stopPropagation();
    this.sidenavVisible = !this.sidenavVisible;
    const sidenav:any = document.getElementById('sidenav-main');
    sidenav.style.transform = this.sidenavVisible ? 'translateX(0)' : 'translateX(-100%)';
  }

  obtenerDatosEmpresa() {
    this._personaService.getPersonaByUser(this.usuario.id_usuario).subscribe(
      result => {
        this.persona = <Persona>result;
        console.log(this.factura);
        this._empresaService.getEmpresa(this.factura.id_empresa).subscribe(
          result => {
            this.empresa = <Empresa>result;
            this.dialogRef.close();
            //console.log(this.empresa);
            /*
            this._direccionService.getDireccion(this.empresa.direccion).subscribe(
              result => {
                this.direccionE = <Direccion>result;
                //console.log(this.direccionE);
                this._paisService.getPais(this.direccionE.id_pais).subscribe(
                  result => {
                    this.paisE = <Pais>result;
                    //console.log(this.paisE);
                  }
                )
                this._ciudadService.getCiudad(this.direccionE.id_ciudad).subscribe(
                  result => {
                    this.ciudadE = <Ciudad>result;
                    //console.log(this.ciudadE);
                    this.dialogRef.close();
                  }
                )
              })*/
          },
          error => {
            this.dialogRef.close();
            //console.log(error)
          })
      })
  }

  obtenerFactura() {
    this._facturaService.getFactura(this.id).subscribe(
      result => {
        this.factura = <Factura>result;
        this.dialogRef.close();
        //console.log(this.factura)
      }
    )
  }
  obtenerProductos() {
    this._detfactService.getDetFactByIdFact(this.id).subscribe(
      result => {
        this.detfacts = result;
        console.log(this.detfacts)
        this._pagoService.getPago(this.detfacts[0].id_pago).subscribe(
          result => {
            this.pago = <Pago>result;
            this.obtenerDescuento();
            this.dialogRef.close();
          }
        )
        for (const detfact of this.detfacts) {
          this._productoService.getProducto(detfact.id_producto).subscribe(
            result => {
              this.productos.push(result)
            }
          )
        }
        
      }

    );
  }
  obtenerDescuento() {
    if (this.pago.periodo == 1) { this.periodo = "Mensual"; };
    if (this.pago.periodo == 3) { this.periodo = "Trimestral"; };
    if (this.pago.periodo == 6) { this.periodo = "Semestral"; };
    if (this.pago.periodo == 12) { this.periodo = "Anual"; };
    this._membresiaService.getMembresias().subscribe(
      result => {
        this.membresias = result;
        for (const membr of this.membresias) {
          if (membr.tipo == this.periodo) {
            this.membresia = membr;
          }
        }
      }
    );
  }
  obtenerSubtotal(precio: number){
    return Math.round(precio*this.pago.periodo*100)/100;
  }
  obtenerImporteT(){
    return Math.round(this.productos.reduce((acumulador, producto) => acumulador + producto.precio * this.pago.periodo, 0)*100)/100;
  }
  obtenerIva(){
    return Math.round(this.productos.reduce((acumulador, producto) => acumulador + producto.precio * this.pago.periodo, 0)*(1-this.membresia.descuento+this.factura.iva)*100)/100;
  }
  obtenerSubtotalResultado(){
    return Math.round((this.obtenerImporteT()-(this.obtenerImporteT()*this.membresia.descuento))*100)/100;
  }
  obtenerTotal() {
    return this.factura.total
  }
  obtener_iva_resultado(){
    let subtotal=this.obtenerImporteT();
    return Math.round((subtotal-(subtotal*this.membresia.descuento))*this.factura.iva*100)/100;
  }
}
