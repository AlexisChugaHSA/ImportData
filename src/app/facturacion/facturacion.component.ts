import { Component } from '@angular/core';
import { PagoService } from '../services/pago.service';
import { FacturaService } from '../services/factura.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from '../models/empresa';
import { Usuario } from '../models/usuario';
import { Persona } from '../models/persona';
import { Pago } from '../models/pago';
import { UsuarioService } from '../services/usuario.service';
import { firstValueFrom } from 'rxjs';
import { PersonaService } from '../services/persona.service';
import { DetalleFacturaService } from '../services/detalle_factura.service';
import { EmpresaService } from '../services/empresa.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupPagoComponent } from '../popup-pago/popup-pago.component';
import { PopupCancelarPagoComponent } from '../popup-cancelar-pago/popup-cancelar-pago.component';
import { LocalStorageService } from 'angular-2-local-storage';
import { AuthGuard } from '../services/auth.guard' ;
import { AuthService } from '../services/login.service';
import { PopupCargandoComponent } from '../popup-cargando/popup-cargando.component';


@Component({
  selector: 'app-factracion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent {
  public sidenavVisible=false;
  public facturas: any = [];
  public pagos: any = [];
  public det_facturas: any = [];
  public usuario: Usuario = new Usuario(0, "", "", "");
  public pago!:Pago;
  public persona!: Persona;
  public id_factura!:any;
  public empresa=new Empresa(0,0,"",0,"","","");
  public login=false;
  public dialogRef1!:any;

  constructor(
    private authService: AuthService,
    private _router: Router,
    private route: ActivatedRoute,
    private _pagoService: PagoService,
    private _personaService: PersonaService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private _empresaService: EmpresaService,
    private _detfactService: DetalleFacturaService,
    private _facturaService: FacturaService
  ) {
    this.dialogRef1 = this.dialog.open(PopupCargandoComponent);
    this.checkLoginStatus();
  }
  
  private async checkLoginStatus() {
    try {
      const result = await firstValueFrom(this.authService.getIsLoggedIn());
      let mensaje:any = result;
      this.login = mensaje.login;
      if (!this.login) {
        this._router.navigate(['/login']);
      }
    } catch (error) {
      this._router.navigate(['/login']);
      this.login = false;
      console.error('Error checking login status:', error);
    }
  }
  
  ngOnInit() {
    this.usuario.id_usuario=this.localStorageService.get('id_usuario')
    this.obtenerDatos();
  }

  openDialogCancelar(id:number): void {
    const dialogRef = this.dialog.open(PopupCancelarPagoComponent);
    dialogRef.componentInstance.aceptarClicked.subscribe(() => {
      this.cancelarPago(id);
    });
    dialogRef.afterClosed().subscribe(() => {
      //console.log('El mensaje emergente se cerró.');
    });
  }
  toggleSidenav(event: Event) {
    event.stopPropagation();
    this.sidenavVisible = !this.sidenavVisible;
    const sidenav:any = document.getElementById('sidenav-main');
    sidenav.style.transform = this.sidenavVisible ? 'translateX(0)' : 'translateX(-100%)';
  }
  openDialog(id_pago:number): void {
    this._detfactService.getFactbyPago(5).subscribe(
      result => {
        let id:any=result;
       // const id_factura=id.id_factura;
        const id_factura=6;
        const dialogRef = this.dialog.open(PopupPagoComponent, {
          data: { id_factura }
        });
      },
      error => {
        //console.log(error)
      })

  }

  obtenerDatos(){
    this._personaService.getPersonaByUser(this.usuario.id_usuario).subscribe(
      result => {
        this.persona = <Persona>result;
        //console.log(this.persona);
        this.obtenerFacturas();
        this._empresaService.getEmpresa(this.persona.id_empresa).subscribe(
          result => {
            this.empresa = <Empresa>result;
            //console.log(this.empresa);
            this.obtenerPagos();
          })
      },
      error => {
        //console.log(error)
      })

  }/*
  obtenerFacturas(){
    this._facturaService.getFacturasByIdEmp(this.persona.id_empresa).subscribe(
      result => {
        this.facturas=result;
        this.facturas=this.facturas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        //console.log(this.facturas)
      },
      error => {
        //console.log(error)
      })
  }*/
      async obtenerFacturas() {
        try {
          const result = await firstValueFrom(this._facturaService.getFacturasByIdEmp(this.persona.id_empresa));
          this.facturas = result;
          this.facturas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
          console.log(this.facturas);
        } catch (error) {
          console.error('Error fetching facturas:', error);
        }
      }

      async obtenerPagos() {
        try {
          const result = await firstValueFrom(this._pagoService.getPagobyEmp(this.empresa.id_empresa));
          this.pagos = result;
          this.pagos.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
          console.log(this.pagos);
          this.dialogRef1.close();
        } catch (error) {
          console.error('Error fetching pagos:', error);
        }
      }
      
  cancelarPago(id:number){
    this._pagoService.putCancelPago(id).subscribe(
      result => {
        this.obtenerPagos();
        //console.log(result);
      },
      error => {
        //console.log(error);
      })
  }

}
