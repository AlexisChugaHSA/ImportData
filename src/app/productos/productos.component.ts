import { Component } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../services/global.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { PersonaService } from '../services/persona.service';
import { Persona } from '../models/persona';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  public productos!:any;
  public cat!:any;
  public categoria="categoria";
  public usuario!: Usuario;
  public categorias: string[] = [];
  public productos_carrito:any;
  public num_productos!:number;
  constructor(
    private _productoService:ProductoService,
    private _route:ActivatedRoute,
    private _router: Router,
    private localStorageService: LocalStorageService
  ){
    this.usuario = new Usuario(0, "", "", "");
  }

    /*
    get_cat_prod(id:number){
      this._productoService.getCatProd(id).subscribe(
        result=>{
          this.cat=result
          this.categoria=this.cat.nombre
          console.log(this.categoria)
          return this.categoria

        },
        error=>{
          console.log(<any>error)
        }
      )
    }*/

  ngOnInit(){
    this.usuario.id_usuario=this.localStorageService.get('id_usuario')
    console.log("Productos funcionando")
    this._productoService.getProductos().subscribe(
      result=>{
        console.log(result)
        this.productos=result
      },
      error=>{
        console.log(<any>error)
      }
    )
    const savedArray = this.localStorageService.get('Productos-Carrito');
    if (savedArray) {
      this.productos_carrito = savedArray;
      console.log(this.productos_carrito)
      this.num_productos=this.productos_carrito.length;
      this.localStorageService.set('Productos-Carrito', this.productos_carrito);
    }
  }


}
