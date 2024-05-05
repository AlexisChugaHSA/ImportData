import { Component } from '@angular/core';
import { PagoService } from '../services/pago.service';
import { FacturaService } from '../services/factura.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from '../models/empresa';
import { Usuario } from '../models/usuario';
import { Persona } from '../models/persona';
import { Pago } from '../models/pago';
import { UsuarioService } from '../services/usuario.service';
import { PersonaService } from '../services/persona.service';
import { DetalleFacturaService } from '../services/detalle_factura.service';
import { EmpresaService } from '../services/empresa.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupPagoComponent } from '../popup-pago/popup-pago.component';
import { PopupCancelarPagoComponent } from '../popup-cancelar-pago/popup-cancelar-pago.component';
import { LocalStorageService } from 'angular-2-local-storage';
import { AuthGuard } from '../services/auth.guard' ;
import { AuthService } from '../services/login.service';

@Component({
  selector: 'app-factracion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent {
  public facturas: any = [];
  public pagos: any = [];
  public det_facturas: any = [];
  public usuario: Usuario = new Usuario(0, "", "", "");
  public pago!:Pago;
  public persona!: Persona;
  public empresa!:Empresa;
  public login=false;

  constructor(
    private authService:AuthService,
    private _router: Router,
    private route: ActivatedRoute,
    private _pagoService: PagoService,
    private _personaService: PersonaService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private _empresaService: EmpresaService,
    private _detfactService: DetalleFacturaService,
    private _facturaService: FacturaService){
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
    this.usuario.id_usuario=this.localStorageService.get('id_usuario')
    this.obtenerDatos();
  }

  openDialogCancelar(id:number): void {
    const dialogRef = this.dialog.open(PopupCancelarPagoComponent);
    dialogRef.componentInstance.aceptarClicked.subscribe(() => {
      this.cancelarPago(id);
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('El mensaje emergente se cerró.');
    });
  }

  openDialog(mensaje:string, total:number): void {
    const dialogRef = this.dialog.open(PopupPagoComponent, {
      width: '550px',
      data: {
        title: 'Detalles de su pago',
      detail: mensaje,
      total: 'Total pagado: '+total,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('El mensaje emergente se cerró.');
    });
  }

  obtenerDatos(){
    this._personaService.getPersonaByUser(this.usuario.id_usuario).subscribe(
      result => {
        this.persona = <Persona>result;
        console.log(this.persona);
        this.obtenerFacturas();
        this._empresaService.getEmpresa(this.persona.id_empresa).subscribe(
          result => {
            this.empresa = <Empresa>result;
            console.log(this.empresa);
            this.obtenerPagos();
          })
      },
      error => {
        console.log(error)
      })

  }
  obtenerFacturas(){
    this._facturaService.getFacturasByIdEmp(this.persona.id_empresa).subscribe(
      result => {
        this.facturas=result;
        this.facturas=this.facturas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        console.log(this.facturas)
      },
      error => {
        console.log(error)
      })
  }

  obtenerPagos(){
    this._pagoService.getPagobyEmp(this.empresa.id_empresa).subscribe(
      result => {
        this.pagos=result;
        this.pagos=this.pagos.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        console.log(this.pagos);
      },
      error => {
        console.log(error)
      })
  }
  cancelarPago(id:number){
    this._pagoService.putCancelPago(id).subscribe(
      result => {
        this.obtenerPagos();
        console.log(result);
      },
      error => {
        console.log(error);
      })
  }

}
