import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-pago',
  template: `
  <div class="popup-container">
  <h1 class="popup-title">{{ data.title }}</h1>
  <h1 class="popup-title">{{ data.detail }}</h1>
  <h1 class="popup-title">{{ data.total }}</h1>
  <button class="btn bg-gradient-primary mb-0 mt-lg-auto w-50" (click)="closeDialog()">Aceptar</button>
</div>

  `,
  styleUrls: ['./popup-pago.component.css']
})
export class PopupPagoComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupPagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
