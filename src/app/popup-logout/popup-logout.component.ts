import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-logout',
  templateUrl: './popup-logout.component.html',
  styleUrls: ['./popup-logout.component.css']
})
export class PopupLogoutComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupLogoutComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
