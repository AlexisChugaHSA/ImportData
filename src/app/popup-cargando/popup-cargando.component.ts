import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-cargando',
  templateUrl: './popup-cargando.component.html',
  styleUrls: ['./popup-cargando.component.css']
})
export class PopupCargandoComponent {
  
  constructor(public dialogRef: MatDialogRef<PopupCargandoComponent>){
    
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
