import { Component } from '@angular/core';
import { PagoService } from '../services/pago.service';
import { FacturaService } from '../services/factura.service';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-factracion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent {
  public facturas: any = [];
  public pagos: any = [];
  public det_facturas: any = [];
  public usuario!: Usuario;
  public pago!:Pago;
  public persona!: Persona;
  public empresa!:Empresa;

  constructor(private route: ActivatedRoute,
    private _pagoService: PagoService,
    private _personaService: PersonaService,
    private dialog: MatDialog,
    private _empresaService: EmpresaService,
    private _detfactService: DetalleFacturaService,
    private _facturaService: FacturaService){
    this.usuario = new Usuario(45, "alexischuga12345@gmail.com", "", "");


  }
  ngOnInit() {
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
