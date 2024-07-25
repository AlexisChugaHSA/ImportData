import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-error-new-usuario',
  templateUrl: './popup-error-new-usuario.component.html',
  styleUrls: ['./popup-error-new-usuario.component.css']
})
export class PopupErrorNewUsuarioComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupErrorNewUsuarioComponent>
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
