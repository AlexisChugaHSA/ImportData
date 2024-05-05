import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { LocalStorageService } from 'angular-2-local-storage';
import { MembresiaService } from '../services/membresia.service';
import { Membresia } from '../models/membresia';
import { CategoriaService } from '../services/categoria.service';
import { AuthGuard } from '../services/auth.guard' ;
import { AuthService } from '../services/login.service';
@Component({
  selector: 'app-orden-productos',
  templateUrl: './orden-productos.component.html',
  styleUrls: ['./orden-productos.component.css']
})
export class OrdenProductosComponent {
  public productos_carrito!: any;
  public num_productos!: number;
  public membresia1!: Membresia;
  public membresia2!: Membresia;
  public membresia3!: Membresia;
  public membresia4!: Membresia;
  public categorias: any = [];
  public total = 0;
  public total1 = 0;
  public total2 = 0;
  public total3 = 0;
  public total4 = 0;
  public login=false;


  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private _router: Router,
    private _productoService: ProductoService,
    private _membresiaService: MembresiaService,
    private _catService: CategoriaService,

    private localStorageService: LocalStorageService) { 
      this.authService.getIsLoggedIn().subscribe(
        result => {
          let mensaje=result
          this.login=mensaje.login;
          console.log(mensaje.login)
        },
        error => {
          this._router.navigate(['/login'])
          console.log(error)
          this.login=false;
          
        })
    }

  ngOnInit() {
    this.get_carrito();
    this.getCategorias();
    this._membresiaService.getMembresia(1).subscribe(
      result => {
        this.membresia1 = <Membresia>result;
        this._membresiaService.getMembresia(2).subscribe(
          result => {
            this.membresia2 = <Membresia>result;
            this._membresiaService.getMembresia(3).subscribe(
              result => {
                this.membresia3 = <Membresia>result;
                this._membresiaService.getMembresia(4).subscribe(
                  result => {
                    this.membresia4 = <Membresia>result;
                    this.obtenerTotal()
                  }
                )
              }
            )
          }
        )
      }

    )


  }
  buscarCategoria(idBuscado:string):string {
    const objetoEncontrado = this.categorias.find(objeto => objeto.id_categoria === idBuscado);
    if (objetoEncontrado) {
      console.log('Objeto encontrado:', objetoEncontrado);
      return objetoEncontrado.nombre;
    } else {
      console.log('Objeto no encontrado');
      return "N/A";
    }
  }
  redirigir(total: number, membresia: Membresia) {
    this.localStorageService.set('total', total);
    this.localStorageService.set('membresia', membresia);
    this._router.navigate(['formulario-pago'])
    console.log(total)
    console.log(membresia.tipo)

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

  getCategorias() {
    this._catService.getCategorias().subscribe(
      result => {
        this.categorias = result;
        console.log(this.categorias)
      },
      error => {
        console.log(<any>error)
      }
    )
  }
  get_membresias() {
    this._membresiaService.getMembresia(1).subscribe(
      result => {
        console.log(result)
        this.membresia1 = <Membresia>result;

      },
      error => {
        console.log(<any>error)
      }
    )
    this._membresiaService.getMembresia(2).subscribe(
      result => {
        console.log(result)
        this.membresia2 = <Membresia>result;
      },
      error => {
        console.log(<any>error)
      }
    )
    this._membresiaService.getMembresia(3).subscribe(
      result => {
        console.log(result)
        this.membresia3 = <Membresia>result;
      },
      error => {
        console.log(<any>error)
      }
    )
    this._membresiaService.getMembresia(4).subscribe(
      result => {
        console.log(result)
        this.membresia4 = <Membresia>result;
        this.obtenerTotal()
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  eliminarProducto_Car(id: number) {
    const indice = this.productos_carrito.findIndex(producto => producto.id_producto === id);
    if (indice !== -1) {
      const elementoEliminado = this.productos_carrito[indice];
      this.productos_carrito.splice(indice, 1);
      console.log(elementoEliminado)
      this.localStorageService.set('Productos-Carrito', this.productos_carrito);
      this.get_carrito()
      this.obtenerTotal()
    }
    return null;

  }

  obtenerTotal() {
    this.total = 0;
    if (this.productos_carrito.length != 0) {
      this.productos_carrito.forEach((producto) => {
        this.total += producto.precio;
      });

      this.total1 = this.total;
      this.total2 = Math.round((1 - this.membresia2.descuento) * this.total);
      this.total3 = Math.round((1 - this.membresia3.descuento) * this.total);
      this.total4 = Math.round((1 - this.membresia4.descuento) * this.total);
      console.log(this.total4)
    }
    else {
      this.total1 = 0
      this.total2 = 0
      this.total3 = 0
      this.total4 = 0
    }

  }


}
