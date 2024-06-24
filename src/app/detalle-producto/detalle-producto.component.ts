import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { LocalStorageService } from 'angular-2-local-storage';
import { AuthGuard } from '../services/auth.guard' ;
import { AuthService } from '../services/login.service';
import { PopupCargandoComponent } from '../popup-cargando/popup-cargando.component';
import { MatDialog } from '@angular/material/dialog';
import { ContentObserver } from '@angular/cdk/observers';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent {
  public id!:any;
  public otrosProductos: any = [];
  public producto!:Producto;
  public todosProductos: any = [];
  public productos_carrito:any=[];
  public num_productos=0;
  public login=false;
  public dialogRef!:any;
  images: string[] = [];
  isViewerOpen = false;
  currentImageIndex = 0;

  constructor(
    private authService: AuthService,
    private _router: Router,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private _productoService:ProductoService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService) {
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
        this.images = [
          `/assets/img/productos/${this.producto.nombre}/${this.producto.nombre}1.png`,
          `/assets/img/productos/${this.producto.nombre}/${this.producto.nombre}2.png`,
          `/assets/img/productos/${this.producto.nombre}/${this.producto.nombre}3.png`,
          `/assets/img/productos/${this.producto.nombre}/${this.producto.nombre}4.png`
        ];
        this.obtenerTodosProductos();
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


  obtenerTodosProductos(){
    this._productoService.getProductos().subscribe(
      result=>{
        console.log(result)
        this.todosProductos=result
        this.otrosProductos = this.todosProductos.filter(item => item.id_producto !== this.producto.id_producto);
        this.dialogRef.close();
    console.log(this.otrosProductos);
        this.dialogRef.close();
      },
      error=>{
        console.log(<any>error)
      }
    )
}
getDescripcion(nombre: string): string {
  switch (nombre) {
    case 'Aires acondicionados':
      return 'Sumérgete en el análisis de importaciones de aire acondicionado. Descubre quiénes son los principales importadores y las marcas más populares.';
      break;
    case 'Celulares':
      return 'Explora datos clave sobre la importación de celulares. Descubre las marcas más populares, el volumen importado y más.';
      break;
    case 'Cocinas':
      return 'Descubre insights sobre la importación de cocinas. Obtén información detallada sobre marcas líderes, volumen importado y más.';
      break;
    case 'Computadoras':
      return 'Explora los datos clave sobre la importación de computadoras. Obtén información detallada sobre marcas, segmento de mercado y más.';
      break;
    case 'Lavadoras y Secadoras':
        return ' Sumérgete en el análisis de importaciones de lavadoras y secadoras. Encuentra información detallada sobre marcas, volumen importado y más.';
        break;
    case 'Motos':
        return 'Descubre insights sobre la importación de motos. Obtén información detallada sobre marcas líderes, volumen importado y más.';
        break;
    case 'Refrigeracion':
        return 'Sumérgete en el análisis de importaciones de refrigeradores. Descubre quiénes son los principales importadores y las marcas más populares.';
        break;
    case 'Televisores':
        return 'Descubre los datos más relevantes sobre la importación de televisores. Obtén insights sobre el share de mercado, los principales importadores y más.';
        break;
    default:
      return 'Descripción no disponible';
  }
}
dirigirProducto(id: string){
  this._router.navigate(['/home']).then(() =>
    this._router.navigate(['/detalle-producto', id]).then(() =>     
    window.location.reload())
);

}
openImageViewer(imageSrc: string) {
  this.currentImageIndex = this.images.indexOf(imageSrc);
  if (this.currentImageIndex >= 0) {
    this.isViewerOpen = true;
  }
}

closeImageViewer() {
  this.isViewerOpen = false;
}
}
