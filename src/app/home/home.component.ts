import { Component } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Usuario } from '../models/usuario';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { ProductoUsuarioService } from '../services/producto_usuario.service';
import { AuthGuard } from '../services/auth.guard' ;
import { AuthService } from '../services/login.service';
import { PopupCargandoComponent } from '../popup-cargando/popup-cargando.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public productos_carrito:any;
  public prodsUser: any = [];
  public todosProductos: any = [];
  public productos: any = [];
  public otrosProductos: any = [];
  public num_productos=0;
  public usuario!: Usuario;
  public login=false;
  public dialogRef!:any;

  constructor(
    private authService: AuthService,
    private _productoService:ProductoService,
    private _route:ActivatedRoute,
    private _router: Router,
    private localStorageService: LocalStorageService,
    private _produserService: ProductoUsuarioService,
    private dialog: MatDialog
  ){
      this.dialogRef = this.dialog.open(PopupCargandoComponent);
      this.authService.getIsLoggedIn().subscribe(
        result => {
          let mensaje=result
          this.login=mensaje.login;
          if(this.login){
             console.log(mensaje.login)
          }
          else{
             this._router.navigate(['/login'])
          }
          console.log(mensaje.login)
        },
        error => {
          this._router.navigate(['/login'])
          console.log(error)
          this.login=false;
          
        })
    this.usuario = new Usuario(0, "", "", "");
  }
  ngOnInit() {

    this.usuario.id_usuario=this.localStorageService.get('id_usuario')
    this.getCarrito();
    this.obtenerDatos();

  }

  getCarrito(){
    const savedArray = this.localStorageService.get('Productos-Carrito');
    if (savedArray) {
      this.productos_carrito = savedArray;
      console.log(this.productos_carrito)
      this.num_productos=this.productos_carrito.length;
      this.localStorageService.set('Productos-Carrito', this.productos_carrito);
    }
  }
  obtenerDatos(){
    this._produserService.getP_U(this.usuario.id_usuario).subscribe(
      result => {
        this.prodsUser= result;
        console.log(this.prodsUser)
        for (const prod of this.prodsUser) {
          this._productoService.getProducto(prod.id_producto).subscribe(
            result=>{
              this.productos.push(result);
            }
          )
        }
        console.log(this.productos)
        this.obtenerTodosProductos();
        this.obtenerOtrosProductos();
      },
      error => {
        console.log(error)
      })

  }
  obtenerTodosProductos(){
    this._productoService.getProductos().subscribe(
      result=>{
        console.log(result)
        this.todosProductos=result
        this.dialogRef.close();
      },
      error=>{
        console.log(<any>error)
      }
    )
}
  obtenerOtrosProductos(){
    this.otrosProductos=this.todosProductos.filter(itemA => {
      return !this.productos.some(itemB => itemB.id_producto === itemA.id_producto);
    });
    console.log(this.otrosProductos.length);
    console.log(this.todosProductos.length- this.productos.length)
    if(this.otrosProductos.length==(this.todosProductos.length- this.productos.length)){

    }
  }
}
