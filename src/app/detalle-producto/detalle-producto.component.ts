import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { LocalStorageService } from 'angular-2-local-storage';
import { AuthGuard } from '../services/auth.guard' ;
import { AuthService } from '../services/login.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent {
  public id!:any;
  public producto!:Producto;
  public productos_carrito:any=[];
  public num_productos!:number;
  public login=false;

  constructor(
    private authService: AuthService,
    private _router: Router,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private _productoService:ProductoService,
    private localStorageService: LocalStorageService) {
      this.authService.getIsLoggedIn().subscribe(
        result => {
          let mensaje=result
          this.login=mensaje.login;
          console.log(mensaje.login)
        },
        error => {
          //this._router.navigate(['/login'])
          console.log(error)
          this.login=false;
          
        })
    }

  
  addToCar(){
    console.log(this.producto)
    const existe = this.productos_carrito.some(item => item.id_producto === this.producto.id_producto);
    if(!existe) {
    this.productos_carrito.push(this.producto);
    this.num_productos=this.productos_carrito.length;
    this.localStorageService.set('Productos-Carrito', this.productos_carrito);
    setTimeout(() => {
      const alertP= document.querySelector('#alertP');
      this.renderer.setStyle(alertP, 'display', 'block');
      setTimeout(() => {
        this.renderer.setStyle(alertP, 'display', 'none');
      }, 3000);
    }, 0); 
  }}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this._productoService.getProducto(this.id).subscribe(
      result=>{
        this.producto=<Producto>result
      },
      error=>{
        console.log(<any>error)
      }
    )
    const savedArray = <any[]>this.localStorageService.get('Productos-Carrito');
    if (savedArray) {
      this.productos_carrito = savedArray;
      console.log(this.productos_carrito)
      this.num_productos=this.productos_carrito.length;
      this.localStorageService.set('Productos-Carrito', this.productos_carrito);
    }

  }

  
}
