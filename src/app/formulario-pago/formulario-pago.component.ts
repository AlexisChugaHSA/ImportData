import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Tarjeta } from '../models/tarjeta';
import { LocalStorageService } from 'angular-2-local-storage';
import { Membresia } from '../models/membresia';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup-component/popup-component.component';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { PersonaService } from '../services/persona.service';
import { PagoService } from '../services/pago.service';
import { ProductoUsuarioService } from '../services/producto_usuario.service';
import { LogProductoUsuarioService } from '../services/log_producto_usuario.service';
import { EMetPagoService } from '../services/metpago.service';
import { FacturaService } from '../services/factura.service';
import { DetalleFacturaService } from '../services/detalle_factura.service';
import { Persona } from '../models/persona';
import { Pago } from '../models/pago';
import { Factura } from '../models/factura';
import { DetalleFactura } from '../models/detalle_factura';
import { MetodoPago } from '../models/metodo_pago';
import { ProductoUsuario } from '../models/producto_usuario';
import { LogProductoUsuario } from '../models/log_producto_usuario';

@Component({
  selector: 'app-formulario-pago',
  templateUrl: './formulario-pago.component.html',
  styleUrls: ['./formulario-pago.component.css']
})
export class FormularioPagoComponent {
  public tarjeta = new Tarjeta("", "", "", "", "");
  public tarjetaVencida = false;
  public productos_carrito!: any;
  public num_productos!: number;
  public membresia!: Membresia;
  public total!: number;
  public total2!: number;
  public periodo!: number;
  public usuario!: Usuario;
  public persona!: Persona;
  public pago!: Pago;
  public pagoR!: any;
  public factura!: Factura;
  public facturaR!: any;
  public prod_user!: ProductoUsuario;
  public prod_userR!: ProductoUsuario;
  public metodo_pago!: MetodoPago;
  public log_prod_user!: LogProductoUsuario;
  public detalle_factura!: DetalleFactura;
  public prod_users: any = [];
  public iva=0.12;

  constructor(private route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private dialog: MatDialog,
    private _productoService: ProductoService,
    private _personaService: PersonaService,
    private _pagoService: PagoService,
    private _metpagoService: EMetPagoService,
    private _facturaService: FacturaService,
    private _productoUsuarioService: ProductoUsuarioService,
    private _logPU: LogProductoUsuarioService,
    private renderer: Renderer2,
    private _detalleFacturaService: DetalleFacturaService,
    private localStorageService: LocalStorageService) {
    this.usuario = new Usuario(0, "", "", "");
    this.metodo_pago = new MetodoPago(0, "", "");
    this.pago = new Pago(0, 0, 0, 0, 0, "", 0, 0, "",0,"");
    this.prod_user = new ProductoUsuario(0, 0, 0, 0,0, 0,0);
    this.factura = new Factura(0,0,0,0,"",0,0);
    this.detalle_factura = new DetalleFactura(0, 1, 0, 1, 0);

  }

  ngOnInit() {
    this.usuario.id_usuario=this.localStorageService.get('id_usuario')
    this.get_carrito()
    this.get_total()
    this.obtenerDatos()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '550px',
      data: {
        title: 'Su orden ha sido procesada exitosamente',
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('El mensaje emergente se cerró.');
    });
  }


  validateFecha() {
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth() + 1;
    let anio = parseInt(this.tarjeta.anio)
    let mes = parseInt(this.tarjeta.mes)
    if (anio < añoActual) {
      return false;
    }
    if (anio === añoActual) {
      if (mes > mesActual) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return true

    }

  }
  subirDatos() {
    if (this.validateFecha()) {
      this.tarjetaVencida = false;
      this.guardarMetPago();

      this.guardarPago()
      this.openDialog();
      console.log(this.tarjetaVencida)
      this._router.navigate(['/home']);
    } else {
      this.tarjetaVencida = true;
      console.log(this.tarjetaVencida)
    }

  }

  mostrarForm() {
    var checkbox = document.getElementById("customCheck1");
    const form1 = document.querySelector('#formPago');
    if ((checkbox as HTMLInputElement).checked) {
      this.renderer.setStyle(form1, 'display', 'block');
    } else {
      // Ejecutar función cuando el checkbox está deseleccionado
      this.renderer.setStyle(form1, 'display', 'none');
    }

  }


  get_carrito() {
    const savedArray = this.localStorageService.get('Productos-Carrito');
    if (savedArray) {
      this.productos_carrito = savedArray;
      console.log(this.productos_carrito)
      this.num_productos = this.productos_carrito.length;
      this.localStorageService.set('Productos-Carrito', this.productos_carrito);
    }
  }
  get_total() {
    var subtotal = this.productos_carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    this.membresia = this.localStorageService.get('membresia');
    console.log(this.membresia);
    if (this.membresia.tipo === "Mensual") { this.periodo = 1 }
    if (this.membresia.tipo === "Trimestral") { this.periodo = 3 }
    if (this.membresia.tipo === "Semestral") { this.periodo = 6 }
    if (this.membresia.tipo === "Anual") { this.periodo = 12 }
    this.total2 = this.productos_carrito.reduce((acumulador, producto) => acumulador + producto.precio * this.periodo, 0);
    this.total = Math.round((1 - this.membresia.descuento) * this.total2*(1+this.iva)*100)/100;
  }
  soloNumeros(event: KeyboardEvent): void {
    const keyCode = event.keyCode || event.which;
    const tecla = String.fromCharCode(keyCode);
    const soloNumeros = /[0-9]/;

    if (!soloNumeros.test(tecla)) {
      event.preventDefault();
    }
  }

  obtenerDatos() {
    this._personaService.getPersonaByUser(this.usuario.id_usuario).subscribe(
      result => {
        this.persona = <Persona>result;
        console.log(this.persona)
      },
      error => {
        console.log(error)
      })

  }
  guardarMetPago() {
    // Obtener los primeros y últimos tres dígitos
    let primerosTres = this.tarjeta.numero.slice(0, 3);
    let ultimosTres = this.tarjeta.numero.slice(-3);
    // Generar una cadena de asteriscos del mismo tamaño que los dígitos intermedios
    let asteriscos = '*'.repeat(this.tarjeta.numero.length - 6); // Restamos 6 para excluir los primeros y últimos tres dígitos
    // Construir el resultado final
    this.metodo_pago.nombre = this.tarjeta.nombre;
    this.metodo_pago.tarjeta = primerosTres + asteriscos + ultimosTres;
    this._metpagoService.addMetPago(this.metodo_pago).subscribe(
      result => {
        console.log("Metodo de pago guardado")
      },
      error => {
        console.log(error)
      })
    console.log(this.tarjeta);
  }
  guardarPago() {
    this.pago.detalle = this.productos_carrito.map(producto => producto.nombre).join(' - ');
    this.pago.descuento = this.membresia.descuento;
    this.pago.id_empresa = this.persona.id_empresa;
    this.pago.periodo = this.periodo;
    this.pago.valor = this.total;
    this.pago.procesado = 1;
    this.pago.intentos = 0;
    console.log(this.pago);
    this._pagoService.addPago(this.pago).subscribe(
      result => {
        this.pagoR = result;
        console.log("Pago guardado")
        this.guardarFactura();
        this.gradarProductoUsuario();
      },
      error => {
        console.log(error)
      })
  }

  gradarProductoUsuario() {
    this.prod_user.id_usuario = this.usuario.id_usuario;
    this.prod_user.activo = 1;
    this.prod_user.id_pago=this.pagoR.id_pago
    this.prod_user.periodo=this.periodo;
    this.productos_carrito.forEach(producto => {
      this.prod_user.id_producto = parseInt(producto.id_producto);
      this.prod_user.precio = producto.precio;
      console.log("XXXXXX" +this.prod_user);
      this._productoUsuarioService.addProdUser(this.prod_user).subscribe(
        result => {
          this.prod_users.push(result)
          console.log("producto-Usuario guardado")
        },
        error => {

          console.log(error)
        }
      )

    });
    console.log(this.prod_users)
  }

  guardarFactura() {
    this.factura.id_empresa = this.persona.id_empresa;
    this.factura.total = this.total * (1 + this.factura.iva);
    this.factura.subtotal = this.total;
    this._facturaService.addFactura(this.factura).subscribe(
      result => {
        this.facturaR = result;
        console.log("Factura guardada")
        this.guardarDetalleFactura();
      },
      error => {
        console.log(error)
      }
    )
  }
  guardarDetalleFactura() {
    this.detalle_factura.id_factura = this.facturaR.id_factura;
    this.detalle_factura.id_pago = this.pagoR.id_pago;
    this.productos_carrito.forEach(producto => {
      this.detalle_factura.id_producto = parseInt(producto.id_producto);
      this.detalle_factura.precio = producto.precio;
      this._detalleFacturaService.addDetFactura(this.detalle_factura).subscribe(
        result => {
          console.log(result);
        },
        error => {
          console.log(error)
        }
      )
    });

  }
  obtenerSubtotalT(){
    return Math.round(this.productos_carrito.reduce((acumulador, producto) => acumulador + producto.precio * this.periodo, 0)*(1-this.membresia.descuento)*100)/100;
  }



}
