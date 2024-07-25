import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { EmailService } from '../services/email.service';
import { PersonaService } from '../services/persona.service';
import { Usuario } from '../models/usuario';
import { Persona } from '../models/persona';
import { ProductoUsuarioService } from '../services/producto_usuario.service';
import { ProductoService } from '../services/producto.service';
import { PopupErrorNewUsuarioComponent } from '../popup-error-new-usuario/popup-error-new-usuario.component';
import { PopupErrorPagoComponent } from '../popup-error-pago/popup-error-pago.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas-imp.component.html',
  styleUrls: ['./pruebas-imp.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0px', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class PruebasImpComponent  {
  public usuario!: Usuario;
  public persona!: Persona;
  public prodsUser: any = [];
  public productos: any = [];

 constructor(private _usuarioService: UsuarioService,
  private _emailService: EmailService,
  private _personaService: PersonaService,
  private _produserService: ProductoUsuarioService,
  private _productoService:ProductoService,
  private dialog: MatDialog
 ){
  this.usuario = new Usuario(45, "", "","")
 }
 ngOnInit(){
  const dialogRef = this.dialog.open(PopupErrorPagoComponent);
 }

 obtenerCorreo(){
      this._personaService.getPersonaByUser(this.usuario.id_usuario).subscribe(
        result => {
          this.persona = <Persona>result;
          this.enviarCorreoBienvenida();
          this.enviarCorreoContraseña();
          this.obtenerProductos()
          //
            },
            error => {
              //console.log(error)
            }
          )
 }
 enviarCorreoBienvenida(){
  this._emailService.enviarEmailBienvenida(this.persona.correo).subscribe(
    result => {
      console.log(result)
        },
        error => {
          console.log(error)
        }
      )
 }
 enviarCorreoContraseña(){
  this._emailService.enviarEmailRestaurarContrasenia(this.usuario.id_usuario, this.persona.correo).subscribe(
    result => {
      console.log(result)
        },
        error => {
          //console.log(error)
        }
      )
 }
 obtenerProductos(){
  this._produserService.getP_U(this.usuario.id_usuario).subscribe(
    result => {
      this.prodsUser = result;
      //console.log(this.prodsUser);
      const productosTemp:any=[];
      for (const prod of this.prodsUser) {
        this._productoService.getProducto(prod.id_producto).subscribe(
          (result) => {
            // Agregar el campo 'fecha' al producto
            const producto2:any=result
            producto2.fecha=prod.fecha;
            producto2.fecha_hasta=prod.fecha_hasta;
            productosTemp.push(producto2);
            // Solo actualizar 'this.productos' una vez que todos los productos se han agregado
            if (productosTemp.length === this.prodsUser.length) {
              this.productos = productosTemp;
              this.enviarCorreoProductos();
            }
          },
          error => {
            //console.log(error);
          }
        );
      }
    },
    error => {
      //console.log(error);
    }
  );
  
  
}
  enviarCorreoProductos(){
    this._emailService.enviarEmailCaducaProducto(this.persona.correo,this.productos).subscribe(
      result => {
        console.log(result)
          },
          error => {
            console.log(error)
          }
        )
  }
}