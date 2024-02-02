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
import { ActivatedRoute } from '@angular/router';
import { Factura } from '../models/factura';
import { ProductoService } from '../services/producto.service';
import { Pago } from '../models/pago';
import { PagoService } from '../services/pago.service';
import { MembresiaService } from '../services/membresia.service';
import { Membresia } from '../models/membresia';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css']
})
export class DetalleFacturaComponent {
  public persona!: Persona;
  public empresa!: Empresa;
  public usuario: Usuario;
  public direccionE!: Direccion;
  public paisE!: Pais;
  public ciudadE!: Ciudad;
  public id!: any;
  public factura!: Factura;
  public detfacts!: any;
  public productos: any = [];
  public pago!: Pago;
  public membresias: any = [];
  public membresia!: Membresia;
  public periodo = "";
  public total = 0;

  constructor(
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
    private _membresiaService: MembresiaService
  ) {
    this.usuario = new Usuario(45, "alexischuga12345@gmail.com", "", "");
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.obtenerDatosEmpresa();
    this.obtenerFactura();
    this.obtenerProductos();
  }

  obtenerDatosEmpresa() {
    this._personaService.getPersonaByUser(this.usuario.id_usuario).subscribe(
      result => {
        this.persona = <Persona>result;
        console.log(this.persona);
        this._empresaService.getEmpresa(this.persona.id_empresa).subscribe(
          result => {
            this.empresa = <Empresa>result;
            console.log(this.empresa);
            this._direccionService.getDireccion(this.empresa.direccion).subscribe(
              result => {
                this.direccionE = <Direccion>result;
                console.log(this.direccionE);
                this._paisService.getPais(this.direccionE.id_pais).subscribe(
                  result => {
                    this.paisE = <Pais>result;
                    console.log(this.paisE);
                  }
                )
                this._ciudadService.getCiudad(this.direccionE.id_ciudad).subscribe(
                  result => {
                    this.ciudadE = <Ciudad>result;
                    console.log(this.ciudadE);
                  }
                )
              })
          },
          error => {
            console.log(error)
          })
      })
  }

  obtenerFactura() {
    this._facturaService.getFactura(this.id).subscribe(
      result => {
        this.factura = <Factura>result;
        console.log(this.factura)
      }
    )
  }
  obtenerProductos() {
    this._detfactService.getDetFactByIdFact(this.id).subscribe(
      result => {
        this.detfacts = result;
        this._pagoService.getPago(this.detfacts[1].id_pago).subscribe(
          result => {
            this.pago = <Pago>result;
            this.obtenerDescuento();
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
    console.log(this.productos);
    
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
    return Math.round(precio*(1-this.membresia.descuento)*this.pago.periodo*100)/100;
  }
  obtenerSubtotalT(){
    return Math.round(this.productos.reduce((acumulador, producto) => acumulador + producto.precio * this.pago.periodo, 0)*(1-this.membresia.descuento)*100)/100;
  }
  obtenerIva(){
    return Math.round(this.productos.reduce((acumulador, producto) => acumulador + producto.precio * this.pago.periodo, 0)*(1-this.membresia.descuento)*100)/100;
  }
  obtenerTotal() {
    return Math.round(this.productos.reduce((acumulador, producto) => acumulador + producto.precio * this.pago.periodo, 0)*(1-this.membresia.descuento)*(1+this.factura.iva)*100)/100;
  }
}
