import { Component } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../services/global.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { PersonaService } from '../services/persona.service';
import { Persona } from '../models/persona';
import { Usuario } from '../models/usuario';
import { AuthGuard } from '../services/auth.guard' ;
import { AuthService } from '../services/login.service';
import { PopupCargandoComponent } from '../popup-cargando/popup-cargando.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  public sidenavVisible = false;
  public productos!:any;
  public cat!:any;
  public categoria="categoria";
  public usuario!: Usuario;
  public categorias: string[] = [];
  public productos_carrito:any;
  public num_productos=0;
  public login=false;
  
  constructor(
    private authService: AuthService,
    private _productoService:ProductoService,
    private _route:ActivatedRoute,
    private _router: Router,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog
  ){
      this.authService.getIsLoggedIn().subscribe(
        result => {
          let mensaje=result
          this.login=mensaje.login;
          //console.log(mensaje.login)
        },
        error => {
          //console.log(error)
          this.login=false;
        })
    this.usuario = new Usuario(0, "", "", "");
  }

    /*
    get_cat_prod(id:number){
      this._productoService.getCatProd(id).subscribe(
        result=>{
          this.cat=result
          this.categoria=this.cat.nombre
          //console.log(this.categoria)
          return this.categoria

        },
        error=>{
          //console.log(<any>error)
        }
      )
    }*/

  ngOnInit(){
    const dialogRef1 = this.dialog.open(PopupCargandoComponent);
    this.usuario.id_usuario=this.localStorageService.get('id_usuario')
    //console.log("usuario" +this.usuario.id_usuario)
    this._productoService.getProductos().subscribe(
      result=>{
        //console.log(result)
        this.productos=result
        dialogRef1.close();
      },
      error=>{
        //console.log(<any>error)
      }
    )
    const savedArray = this.localStorageService.get('Productos-Carrito');
    if (savedArray) {
      this.productos_carrito = savedArray;
      //console.log(this.productos_carrito)
      this.num_productos=this.productos_carrito.length;
      this.localStorageService.set('Productos-Carrito', this.productos_carrito);
    }

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


}
