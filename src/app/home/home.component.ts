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
  public sidenavVisible = false;
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
  }
  ngOnInit() {

    this.usuario.id_usuario=this.localStorageService.get('id_usuario')
    this.getCarrito();
    this.obtenerDatos();

  }
  toggleSidenav(event: Event) {
    event.stopPropagation();
    this.sidenavVisible = !this.sidenavVisible;
    const sidenav:any = document.getElementById('sidenav-main');
    sidenav.style.transform = this.sidenavVisible ? 'translateX(0)' : 'translateX(-100%)';
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


  getCarrito(){
    const savedArray = this.localStorageService.get('Productos-Carrito');
    if (savedArray) {
      this.productos_carrito = savedArray;
      //console.log(this.productos_carrito)
      this.num_productos=this.productos_carrito.length;
      this.localStorageService.set('Productos-Carrito', this.productos_carrito);
    }
  }
  obtenerDatos(){
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
                this.obtenerTodosProductos();
                this.obtenerOtrosProductos();
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
  obtenerTodosProductos(){
    this._productoService.getProductos().subscribe(
      result=>{
        //console.log(result)
        this.todosProductos=result
        this.dialogRef.close();
      },
      error=>{
        //console.log(<any>error)
      }
    )
}
  obtenerOtrosProductos(){
    this.otrosProductos=this.todosProductos.filter(itemA => {
      return !this.productos.some(itemB => itemB.id_producto === itemA.id_producto);
    });
    console.log(this.otrosProductos)
  }
  obtenerFechaDesde(id:number){
    //console.log("ZZZZZ "+id)
    //console.log(this.prodsUser)
    const productoEncontrado = this.prodsUser.find(item => item.id_producto === id);
    //console.log(productoEncontrado)
    return productoEncontrado.fecha;
  }
  
}

