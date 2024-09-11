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
import { AuthService } from '../services/login.service';
import { PopupCargandoComponent } from '../popup-cargando/popup-cargando.component';
import { IvaService } from '../services/iva.service';
import {IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import { PayPalService } from '../services/paypal.service';
import { PopupErrorPagoComponent } from '../popup-error-pago/popup-error-pago.component';
import { Empresa } from '../models/empresa';
import { EmpresaService } from '../services/empresa.service';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-formulario-pago',
  templateUrl: './formulario-pago.component.html',
  styleUrls: ['./formulario-pago.component.css']
})
export class FormularioPagoComponent {
  public sidenavVisible = false;
  //public clientIdPayPal='AUq0oeIpyRTe1MYgNM6UicUPoDjgL9nSkgPcwgPXy_ftEusKpN5kSSxBgGgJtreVdWrCh7g5may3GHyu'
  //public secretPayPal='EKR7EPXRZvid0rL-yYqCfR6WR5Si9sCkF7I8mns8Nt-371zh0tSYwMKkTZUojrRlOIrD4ZJTGrfzKBZG'
  public clientIdPayPal='AYLqvj3pfMRED1JHhtL2p1TvTMT_m_jvqTF_VvwtZ-nE8aCfzVdRDLxNs_eR9scSx9ZzKtnlButvv3nw';//dev
  public secretPayPal='EFHeU2Aj6D3tAteJ-yXpEbM6sIVyOdZnCY9HL2jkFXig4xHFWqTUMtoPWLC9vao2VZwRw0l3OIjprmdp';//dev
  public tarjeta = new Tarjeta("", "", "", "", "");
  public tarjetaVencida = false;
  public productos_carrito: any=[];
  public num_productos=0;
  public membresia=new Membresia('',0,0);
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
  public iva!: any;
  public login=false;
  public dialogRef1!:any;
  public payPalConfig ? : IPayPalConfig;
  public empresa2=new Empresa(0,40,"",0,"","","");
  public isFormValid = false;
  public resultEmpresa!:any;
  public empresaExistente:boolean=false;
  showError = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private _router: Router,
    private _paypalService: PayPalService,
    private _usuarioService: UsuarioService,
    private dialog: MatDialog,
    private _productoService: ProductoService,
    private _personaService: PersonaService,
    private _pagoService: PagoService,
    private _metpagoService: EMetPagoService,
    private _facturaService: FacturaService,
    private _productoUsuarioService: ProductoUsuarioService,
    private _logPU: LogProductoUsuarioService,
    private _empresaService: EmpresaService,
    private renderer: Renderer2,
    private _ivaService: IvaService,
    private _emailService:EmailService,
    private _detalleFacturaService: DetalleFacturaService,
    private localStorageService: LocalStorageService) {
      this.dialogRef1 = this.dialog.open(PopupCargandoComponent);
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
          //console.log(mensaje.login)
        },
        error => {
          this._router.navigate(['/login'])
          //console.log(error)
          this.login=false;
          
        })
    this.usuario = new Usuario(0, "", "", "");
    this.metodo_pago = new MetodoPago(0, "", "");
    this.pago = new Pago(0, 0, 0, 0, 0, "", 0, 0, "",0,"");
    this.prod_user = new ProductoUsuario(0, 0, 0, 0,0, 0,0);
    this.factura = new Factura(0,0,0,0,"",0,0,"","","","",0);
    this.detalle_factura = new DetalleFactura(0, 1, 0, 1, 0);

  }

  ngOnInit() {
    this.usuario.id_usuario=this.localStorageService.get('id_usuario')
    this.factura.id_usuario=this.usuario.id_usuario;
    this._ivaService.getIva().subscribe(
      result => {
        let iva:any=result;
        this.iva=iva.iva_valor;
        this.factura.iva=iva.iva_valor;
        this.factura.iva_0=iva.iva_valor;
        //console.log(this.iva)
        this.get_carrito();
      },
      error => {
      })
      
  }
  toggleSidenav(event: Event) {
    event.stopPropagation();
    this.sidenavVisible = !this.sidenavVisible;
    const sidenav:any = document.getElementById('sidenav-main');
    sidenav.style.transform = this.sidenavVisible ? 'translateX(0)' : 'translateX(-100%)';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '550px',
      data: {
        title: 'Su orden ha sido procesada exitosamente',
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      //console.log('El mensaje emergente se cerró.');
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

  comprobarEmpresaExistente(){
    const btnPP= document.querySelector('#btnPaypal');
      const dialogRef = this.dialog.open(PopupCargandoComponent);
      this._empresaService.comprobarEmpresa(this.empresa2.identificacion).subscribe(
        result =>{
          this.resultEmpresa=result;
          if(this.resultEmpresa.Mensaje="SI" && this.resultEmpresa.id_empresa){
            dialogRef.close()
            this._empresaService.getEmpresa(this.resultEmpresa.id_empresa).subscribe(
              result=>{
              let aux:any=result;  
              this.empresa2=aux;
              this.empresaExistente=true;
              this.factura.id_empresa=this.empresa2.id_empresa;
              this.factura.correo_empresa=this.empresa2.correo;
              this.factura.nombre_empresa=this.empresa2.nombre;
              this.factura.ruc_empresa=this.empresa2.identificacion;
              this.factura.telefono_empresa=this.empresa2.telefono;
              //console.log(this.factura);
              this.renderer.setStyle(btnPP, 'display', 'flex');
              }
            )
          }
          else{
            this.empresa2.nombre="";
            this.empresa2.telefono="";
            this.empresa2.correo="";
            this.empresaExistente=false;
            dialogRef.close()
          }
        },
        error=>{
          this.empresa2.nombre="";
          this.empresa2.telefono="";
          this.empresa2.correo="";
          this.empresaExistente=false;
          console.log(error)
          dialogRef.close()

        }  )   
      
  }

  comprobaryGuardarEmpresa(){
    const btnPP= document.querySelector('#btnPaypal');
    const dialogRef = this.dialog.open(PopupCargandoComponent);
      this._empresaService.comprobarEmpresa(this.empresa2.identificacion).subscribe(
        result =>{
          this.resultEmpresa=result;
          if(this.resultEmpresa.Mensaje="SI" && this.resultEmpresa.id_empresa){
            dialogRef.close()
            this._empresaService.getEmpresa(this.resultEmpresa.id_empresa).subscribe(
              result=>{
              let aux:any=result;  
              this.empresa2=aux;
              this.empresaExistente=true;
              this.factura.id_empresa=this.empresa2.id_empresa;
              this.factura.correo_empresa=this.empresa2.correo;
              this.factura.nombre_empresa=this.empresa2.nombre;
              this.factura.ruc_empresa=this.empresa2.identificacion;
              this.factura.telefono_empresa=this.empresa2.telefono;
              console.log(this.factura);
              this.renderer.setStyle(btnPP, 'display', 'flex');
              }
            )
          }
          else{
            this.guardarNuevaEmpresa();
            dialogRef.close()
          }
        },
        error=>{
          this.guardarNuevaEmpresa();
          console.log(error)
          dialogRef.close()

        }  )   

  }
  guardarNuevaEmpresa(){
    const dialogRef = this.dialog.open(PopupCargandoComponent)
    const alertE2= document.querySelector('#alertEE');
    const btnPP= document.querySelector('#btnPaypal');
    console.log(alertE2)
    console.log(this.empresa2);
    this._empresaService.addEmpresa(this.empresa2).subscribe(
      result => {
        let empresa3:any = result
        this.persona.id_empresa = empresa3.id_empresa
        this.factura.id_empresa=empresa3.id_empresa
        this.factura.correo_empresa=this.empresa2.correo;
        this.factura.nombre_empresa=this.empresa2.nombre;
        this.factura.ruc_empresa=this.empresa2.identificacion;
        console.log("Empresa registrada")
        console.log(this.factura);
        this._personaService.editPersona(this.persona.id_persona, this.persona).subscribe(
          result => {
            console.log("Persona Actualizada");
            dialogRef.close();
            this.empresaExistente=true;
            this.renderer.setStyle(btnPP, 'display', 'flex');
          },
          error => {
            dialogRef.close();
            console.log(error)
          })

  },        error => {
    dialogRef.close();
    console.log(error)
  })
  dialogRef.close();
  setTimeout(() => {
    this.renderer.setStyle(alertE2, 'display', 'block');
    setTimeout(() => {
      this.renderer.setStyle(alertE2, 'display', 'none');
    }, 5000);
  }, 0);

}
  subirDatos(data:any) {

    //if (this.validateFecha()) {
      this.tarjetaVencida = false;
      this.guardarMetPago(data);
      //console.log(this.tarjetaVencida)
    //} else {
      //this.tarjetaVencida = true;
      //console.log(this.tarjetaVencida)
    //}
  }



  get_carrito() {
    const savedArray = this.localStorageService.get('Productos-Carrito');
    if (savedArray) {
      this.productos_carrito = savedArray;
      //console.log(this.productos_carrito)
      this.num_productos = this.productos_carrito.length;
      this.localStorageService.set('Productos-Carrito', this.productos_carrito);
      this.get_total()
      this.obtenerDatos()
    }
    else{
      this.dialogRef1.close();
    }
  }
  /*
  getListaProductosPP():any[]{
    const items: any[]=[];
    let item= {};
    this.productos_carrito.forEach((it)=>{
      item={
        name:it.nombre,
        quantity:this.periodo,
        unit_amount:{value: Math.round(it.precio*(1-this.membresia.descuento+parseFloat(this.iva))*100)/100 ,currency_code:'USD'}
      };
      items.push(item);
    });
    //console.log(items)
    return items;
  }*/
  get_total() {
    var subtotal = this.productos_carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    this.membresia = this.localStorageService.get('membresia');
    //console.log(this.membresia);
    if (this.membresia.tipo === "Mensual") { this.periodo = 1 }
    if (this.membresia.tipo === "Trimestral") { this.periodo = 3 }
    if (this.membresia.tipo === "Semestral") { this.periodo = 6 }
    if (this.membresia.tipo === "Anual") { this.periodo = 12 }
    let subtotal2=this.obtenerSubtotalT()*(1-this.membresia.descuento)
    let impuesto=subtotal2*parseFloat(this.iva)
    this.total = Math.round( (subtotal2+impuesto)*100)/100;
    this.initConfig();
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
        //console.log(this.persona)
        this._empresaService.getEmpresa(this.persona.id_empresa).subscribe(
          result => {
            this.empresa2 = <Empresa>result;this.dialogRef1.close();})
        this.dialogRef1.close();
      },
      error => {
        //console.log(error)
        this.dialogRef1.close();
      })
      
  }
  /*
  guardarMetPago(data:any) {
    // Obtener los primeros y últimos tres dígitos
    //let primerosTres = this.tarjeta.numero.slice(0, 3);
    //let ultimosTres = this.tarjeta.numero.slice(-3);
    // Generar una cadena de asteriscos del mismo tamaño que los dígitos intermedios
    //let asteriscos = '*'.repeat(this.tarjeta.numero.length - 6); // Restamos 6 para excluir los primeros y últimos tres dígitos
    // Construir el resultado final
    this.metodo_pago.nombre = data.payer.name?.given_name+" "+data.payer.name?.surname;
    //this.metodo_pago.tarjeta = primerosTres + asteriscos + ultimosTres;
    this.metodo_pago.tarjeta=data.id;
    this._metpagoService.addMetPago(this.metodo_pago).subscribe(
      result => {
        console.log("Metodo de pago guardado")
        this.guardarPago()
      },
      error => {
        const dialogRef = this.dialog.open(PopupErrorPagoComponent);
        this.dialogRef1.close();
        //console.log(error)
      })
    //console.log(this.tarjeta);
  }
  guardarPago() {
    this.pago.detalle = this.productos_carrito.map(producto => producto.nombre).join(' - ');
    this.pago.descuento = this.membresia.descuento;
    this.pago.id_empresa = this.persona.id_empresa;
    this.pago.periodo = this.periodo;
    this.pago.valor = this.total;
    this.pago.procesado = 1;
    this.pago.intentos = 0;
    //console.log(this.pago);
    this._pagoService.addPago(this.pago).subscribe(
      result => {
        this.pagoR = result;
        console.log("Pago guardado")
        this.guardarFactura();
        this.localStorageService.set('Productos-Carrito','');
      },
      error => {
        const dialogRef = this.dialog.open(PopupErrorPagoComponent);
        this.dialogRef1.close();
        //console.log(error)
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
      this._productoUsuarioService.addProdUser(this.prod_user).subscribe(
        result => {
          this.prod_users.push(result);
          this.dialogRef1.close();
          //this.openDialog();
        },
        error => {
          const dialogRef = this.dialog.open(PopupErrorPagoComponent);
          this.dialogRef1.close();
          console.log(error)
        }
      )

    }); //console.log(this.prod_users)
  }
  guardarDetalleFactura() {
    this.detalle_factura.id_factura = this.facturaR.id_factura;
    this.detalle_factura.id_pago = this.pagoR.id_pago;
    this.productos_carrito.forEach(producto => {
      this.detalle_factura.id_producto = parseInt(producto.id_producto);
      this.detalle_factura.precio = this.total;
      this._detalleFacturaService.addDetFactura(this.detalle_factura).subscribe(
        result => {
          console.log(result);
          console.log("Detalle factura guardada"); 
        },
        error => {
          const dialogRef = this.dialog.open(PopupErrorPagoComponent);
          this.dialogRef1.close();
          //console.log(error)
        }
      )
    });
    this.gradarProductoUsuario(); 
  }

  enviarEmailConfirmacion() {
    console.log("producto-Usuario guardado");
    this._emailService.enviarEmailConfirmacionCompra(this.pagoR.id_pago, this.persona.correo).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.error("Error enviando el email de confirmación", error);
      }
    );
  }
  guardarFactura() {
    this.factura.total = this.total;
    this.factura.subtotal = this.obtenerSubtotalT()*(1-this.membresia.descuento);
    this._facturaService.addFactura(this.factura).subscribe(
      result => {
        this.facturaR = result;
        console.log("Factura guardada")
        this.guardarDetalleFactura();
      },
      error => {
        const dialogRef = this.dialog.open(PopupErrorPagoComponent);
        this.dialogRef1.close();
        //console.log(error)
      }
    )
  }*/
    guardarMetPago(data: any) {
      this.metodo_pago.nombre = data.payer.name?.given_name + " " + data.payer.name?.surname;
      this.metodo_pago.tarjeta = data.id;
    
      this._metpagoService.addMetPago(this.metodo_pago).subscribe(
        result => {
          console.log("Método de pago guardado");
          this.guardarPago(); // Llama a guardarPago después de guardar el método de pago
        },
        error => {
          const dialogRef = this.dialog.open(PopupErrorPagoComponent);
          this.dialogRef1.close();
          console.log(error);
        }
      );
    }
    
    guardarPago() {
      this.pago.detalle = this.productos_carrito.map(producto => producto.nombre).join(' - ');
      this.pago.descuento = this.membresia.descuento;
      this.pago.id_empresa = this.persona.id_empresa;
      this.pago.periodo = this.periodo;
      this.pago.valor = this.total;
      this.pago.procesado = 1;
      this.pago.intentos = 0;
    
      this._pagoService.addPago(this.pago).subscribe(
        result => {
          this.pagoR = result;
          console.log("Pago guardado");
          this.localStorageService.set('Productos-Carrito', '');
          this.guardarFactura(); // Llama a guardarFactura después de guardar el pago
        },
        error => {
          const dialogRef = this.dialog.open(PopupErrorPagoComponent);
          this.dialogRef1.close();
          console.log(error);
        }
      );
    }
    
    guardarFactura() {
      this.factura.total = this.total;
      this.factura.subtotal = this.obtenerSubtotalT() * (1 - this.membresia.descuento);
    
      this._facturaService.addFactura(this.factura).subscribe(
        result => {
          this.facturaR = result;
          console.log("Factura guardada");
          this.guardarDetalleFactura(); // Llama a guardarDetalleFactura después de guardar la factura
        },
        error => {
          const dialogRef = this.dialog.open(PopupErrorPagoComponent);
          this.dialogRef1.close();
          console.log(error);
        }
      );
    }
    
    guardarDetalleFactura() {
      this.detalle_factura.id_factura = this.facturaR.id_factura;
      this.detalle_factura.id_pago = this.pagoR.id_pago;
    
      let productosGuardados = 0;
      const totalProductos = this.productos_carrito.length;
    
      this.productos_carrito.forEach(producto => {
        this.detalle_factura.id_producto = parseInt(producto.id_producto);
        this.detalle_factura.precio = this.total;
    
        this._detalleFacturaService.addDetFactura(this.detalle_factura).subscribe(
          result => {
            productosGuardados++;
            console.log("Detalle factura guardado");
    
            // Una vez que todos los detalles de factura estén guardados, guarda los productos del usuario
            if (productosGuardados === totalProductos) {
              this.gradarProductoUsuario();
            }
          },
          error => {
            const dialogRef = this.dialog.open(PopupErrorPagoComponent);
            this.dialogRef1.close();
            console.log(error);
          }
        );
      });
    }
    
    gradarProductoUsuario() {
      let productosGuardados = 0;
      const totalProductos = this.productos_carrito.length;
    
      this.productos_carrito.forEach(producto => {
        this.prod_user.id_usuario = this.usuario.id_usuario;
        this.prod_user.activo = 1;
        this.prod_user.id_pago = this.pagoR.id_pago;
        this.prod_user.periodo = this.periodo;
        this.prod_user.id_producto = parseInt(producto.id_producto);
        this.prod_user.precio = producto.precio;
    
        this._productoUsuarioService.addProdUser(this.prod_user).subscribe(
          result => {
            productosGuardados++;
            this.prod_users.push(result);
            console.log("Producto-Usuario guardado");
    
            // Una vez que todos los productos del usuario hayan sido guardados, enviar el email
            if (productosGuardados === totalProductos) {
              this.dialogRef1.close();
              this.enviarEmailConfirmacion();
            }
          },
          error => {
            const dialogRef = this.dialog.open(PopupErrorPagoComponent);
            this.dialogRef1.close();
            console.log(error);
          }
        );
      });
    }
    
    enviarEmailConfirmacion() {
      console.log("Enviando email de confirmación...");
      this._emailService.enviarEmailConfirmacionCompra(this.pagoR.id_pago, this.persona.correo).subscribe(
        result => {
          this.openDialog();
          console.log("Email de confirmación enviado:", result);
        },
        error => {
          console.error("Error enviando el email de confirmación", error);
          const dialogRef = this.dialog.open(PopupErrorPagoComponent);
          this.dialogRef1.close();
        }
      );
    }
    
  obtenerSubtotalT(){
    return Math.round(this.productos_carrito.reduce((acumulador, producto) => acumulador + producto.precio * this.periodo, 0)*100)/100;
  }
  obtenerTotal(){
    let subtotal=this.obtenerSubtotalT()*(1-this.membresia.descuento)
    console.log(subtotal)
    return this.total = Math.round( subtotal+(subtotal*parseFloat(this.iva))*100)/100;
  }


getListaProductosPP(): any[] {
  const items: any[] = [];
  let subtotal = 0;
  let impuestosTotales = 0;
  
  // Asegúrate de tener el porcentaje de IVA (por ejemplo, 15%)
  const taxRate = parseFloat(this.iva);  // Porcentaje de IVA (0.15 para 15%)

  this.productos_carrito.forEach((it) => {
      const precioSinDescuento = it.precio;  // Precio original sin descuento
      const descuento = this.membresia.descuento;  // Porcentaje de descuento (por ejemplo, 0.15 para 15%)

      // Precio con descuento aplicado (antes de impuestos)
      const precioConDescuento = precioSinDescuento * (1 - descuento);

      // Impuesto sobre el precio con descuento
      const impuestos = precioConDescuento * taxRate;

      // Precio final con impuestos
      const precioFinal = precioConDescuento + impuestos;

      // Sumar al subtotal el precio sin impuestos y con descuento
      subtotal += precioConDescuento;

      // Sumar los impuestos totales
      impuestosTotales += impuestos;

      // Crear el item con el precio calculado (precio con descuento, sin impuestos)
      const item = {
          name: it.nombre,
          quantity: this.periodo,
          unit_amount: {
              value: precioConDescuento.toFixed(2),  // Redondear a 2 decimales
              currency_code: 'USD'
          }
      };

      items.push(item);
  });

  // Devolver los items y asegurarse de tener el subtotal e impuestos correctos
  return items;
}



private initConfig(): void {
  const items = this.getListaProductosPP();

  // Calcular el total de items y de impuestos por separado
  let itemTotal = 0;
  let taxTotal = 0;

  items.forEach(item => {
      itemTotal += parseFloat(item.unit_amount.value) * item.quantity;
  });
  itemTotal=Math.round(itemTotal * 100) / 100;
  console.log(itemTotal)

  // Aquí calculamos el total con los impuestos sumados
  taxTotal = Math.round(itemTotal * parseFloat(this.iva) * 100) / 100;// Calculamos los impuestos totales
  console.log(taxTotal)
  // Ahora configuramos PayPal
  this.payPalConfig = {
      currency: 'USD',
      clientId: this.clientIdPayPal,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                  currency_code: 'USD',
                  value: (itemTotal + taxTotal).toFixed(2),  // Total final con impuestos
                  breakdown: {
                      item_total: {
                          currency_code: 'USD',
                          value: itemTotal.toFixed(2)  // Subtotal sin impuestos
                      },
                      tax_total: {
                          currency_code: 'USD',
                          value: taxTotal.toFixed(2)  // Impuestos totales
                      }
                  }
              },
              items: items
          }]
      },
      advanced: {
        commit: 'true'
    },
    style: {
        label: 'paypal',
        layout: 'vertical'
    },
    onApprove: (data, actions) => {
      this.dialogRef1 = this.dialog.open(PopupCargandoComponent);
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
            console.log('onApprove - you can get full order details inside onApprove: ', details);
           
        });

    },
    onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.subirDatos(data);
    },
    onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
    },
    onError: err => {
        const dialogRef = this.dialog.open(PopupErrorPagoComponent);
        console.log('OnError', err);
    },
    onClick: (data, actions) => {
        console.log('onClick', data, actions);
    }
  };
}





}
