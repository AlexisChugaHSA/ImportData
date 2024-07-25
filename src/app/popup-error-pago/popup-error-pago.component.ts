import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-error-pago',
  templateUrl: './popup-error-pago.component.html',
  styleUrls: ['./popup-error-pago.component.css']
})
export class PopupErrorPagoComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupErrorPagoComponent>
    ) {
  
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.closeDialog();
    }, 5000);
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
