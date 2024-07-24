import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-contrasenia-temporal',
  templateUrl: './popup-contrasenia-temporal.component.html',
  styleUrls: ['./popup-contrasenia-temporal.component.css']
})
export class PopupContraseniaTemporalComponent {
  constructor(
  public dialogRef: MatDialogRef<PopupContraseniaTemporalComponent>
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
