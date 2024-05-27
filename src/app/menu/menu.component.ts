import { Component } from '@angular/core';
import { PersonaService } from '../services/persona.service';
import { Persona } from '../models/persona';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import  { ProductoUsuarioService } from '../services/producto_usuario.service';
import { ProductoService } from '../services/producto.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupLogoutComponent } from '../popup-logout/popup-logout.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  public usuario: Usuario= new Usuario(0, "", "", "");
  public persona: Persona=new Persona(0,0,0,0,"","","","");
  public prodsUser: any = [];
  public productos: any = [];
 
  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private dialog: MatDialog,
    private _userService: UsuarioService,
    private localStorageService: LocalStorageService,
    private _personaService: PersonaService,
    private _produserService: ProductoUsuarioService,
    private _productoService:ProductoService
  ){

  }
  ngOnInit() {
    this.usuario.id_usuario=this.localStorageService.get('id_usuario')
    this.obtenerDatos();

  }
  obtenerDatos(){
    this._personaService.getPersonaByUser(this.usuario.id_usuario).subscribe(
      result => {
        this.persona = <Persona>result;
        console.log(this.persona)
      },
      error => {
        console.log(error)
      })

    this._produserService.getP_U(this.usuario.id_usuario).subscribe(
      result => {
        this.prodsUser= result;
        console.log(this.prodsUser)
        for (const prod of this.prodsUser) {
          this._productoService.getProducto(prod.id_producto).subscribe(
            result=>{
              this.productos.push(result);
              this.productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
            }
          )
        }
      },
      error => {
        console.log(error)
      })

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PopupLogoutComponent);
    dialogRef.afterClosed().subscribe(() => {
      console.log('El mensaje emergente se cerró.');
    });
  }
  closeDialog():void{
    const dialogRef = this.dialog.closeAll();
}
  dirigirDashboardImp(id: string){
    this._router.navigate(['/home']).then(() =>
      this._router.navigate(['/dashboard-producto', id]).then(() =>     
      window.location.reload())
  );

  }
}
