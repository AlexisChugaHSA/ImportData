import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-popup-cancelar-pago',
  templateUrl: './popup-cancelar-pago.component.html',
  styleUrls: ['./popup-cancelar-pago.component.css']
})
export class PopupCancelarPagoComponent {
  public aceptarClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<PopupCancelarPagoComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
  onAceptarClick(): void {
    this.aceptarClicked.emit();
    this.closeDialog();
  }

}
