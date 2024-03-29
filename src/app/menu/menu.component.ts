import { Component } from '@angular/core';
import { PersonaService } from '../services/persona.service';
import { Persona } from '../models/persona';
import { Usuario } from '../models/usuario';
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
  public usuario: Usuario;
  public persona!: Persona;
  public prodsUser: any = [];
  public productos: any = [];
 
  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private _personaService: PersonaService,
    private _produserService: ProductoUsuarioService,
    private _productoService:ProductoService
  ){
    this.usuario = new Usuario(45, "alexischuga12345@gmail.com", "", "");
    this.persona=new Persona(0,0,0,0,"","","","");
  }
  ngOnInit() {
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
            }
          )
        }
        console.log(this.productos)
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
