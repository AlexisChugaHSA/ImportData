import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { LocalStorageService } from 'angular-2-local-storage';

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

  constructor(private route: ActivatedRoute,
    private _productoService:ProductoService,
    private localStorageService: LocalStorageService) {}

  
  addToCar(){
    console.log(this.producto)
    const existe = this.productos_carrito.some(item => item.id_producto === this.producto.id_producto);
    if(!existe) {
    this.productos_carrito.push(this.producto);
    this.num_productos=this.productos_carrito.length;
    this.localStorageService.set('Productos-Carrito', this.productos_carrito);
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
