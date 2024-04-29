import { Component } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Usuario } from '../models/usuario';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { ProductoUsuarioService } from '../services/producto_usuario.service';

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
  public num_productos!:number;
  public usuario!: Usuario;
  constructor(
    private _productoService:ProductoService,
    private _route:ActivatedRoute,
    private _router: Router,
    private localStorageService: LocalStorageService,
    private _produserService: ProductoUsuarioService,
  ){
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
        this.obtenerOtrosProductos();
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
  }
}
