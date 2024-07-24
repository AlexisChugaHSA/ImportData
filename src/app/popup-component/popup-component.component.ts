import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup-component.component.html',
  styleUrls: ['./popup-component.component.css']
})
export class PopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _router: Router,
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    setTimeout(() => {    
      this._router.navigate(['/menu']).then(() =>
        this._router.navigate(['/mis-productos']).then(() =>     
        window.location.reload()))
      this.closeDialog();
    }, 3000);
  }
}
